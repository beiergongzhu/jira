import qs from "qs";
import * as auth from "auth-provider";
import { useAuth } from "context/auth-context";
import { useCallback } from "react";

// 获取环境变量
const apiUrl = process.env.REACT_APP_API_URL;

interface Config extends RequestInit {
  data?: object;
  token?: string;
}

export const http = async (
  endpoint: string,
  { data, token, headers, ...customConfig }: Config = {}
) => {
  const config = {
    method: "get",
    headers: {
      Authorization: token ? `Bearer ${token}` : "",
      "Content-Type": data ? "application/json" : "",
    },
    ...customConfig,
  };
  // 根据不同请求类型做不同处理
  if (config.method === "get") {
    // get请求的参数是在 url 里面
    endpoint += `?${qs.stringify(data)}`;
  } else {
    config.body = JSON.stringify(data || {});
  }
  // axios 和 fetch 的表现不一样，axios可以直接在返回状态不为 2xx 的时候抛出异常，而 fetch 不行
  return fetch(`${apiUrl}/${endpoint}`, config).then(async (response) => {
    if (response.status === 401) {
      // 如果返回的状态码为 401，则退出登录
      await auth.logout();
      window.location.reload(); // 退出登录后刷新一下
      return Promise.reject({ message: "请重新登录" });
    }
    const data = await response.json();
    if (response.ok) {
      return data;
    } else {
      return Promise.reject(data);
    }
  });
};

// 该函数的作用是可以直接从 useAuth 中拿到 user.token 然后自动传递给 http 函数
export const useHttp = () => {
  const { user } = useAuth();
  // Utility Types：工具类型（我们常用的 utils 文件夹就是其缩写）
  // 此处注意：JS中的 typeof 是在 runtime 时运行的，而 ts 中的 typeof 是在静态环境运行的
  // utility type 的用法：用泛型给他传入一个其他类型，然后 utility type 对这个类型进行某种操作

  //  Parameters 可以获取到一个函数的参数类型列表，返回的是一个元组
  return useCallback(
    (...[endpoint, config]: Parameters<typeof http>) =>
      http(endpoint, { ...config, token: user?.token }),
    [user?.token]
  );
};
// 类型别名在很多情况下可以和 interface 互换
// 但他们也有一些不同：

// 比如在下面这种情况下，interface 就没法替代 type
// type FavoriteNumber = string | number;
// let jackFavorite: FavoriteNumber = 1;

// interface 也没法实现 utility type

// type Person = {
//   name: string;
//   age: number;
// };
// const xiaoming: Partial<Person> = { name: "xiaoming" };
// const shenmiren: Omit<Person, "name"> = { age: 10 };
// const shenmiren2: Omit<Person, "name" | "age"> = {};
// const xiaohong: Pick<Person, "name"> = { name: "xiaohong" };
// const xiaogang: Exclude<PersonKeys, "name"> = "age";

// type PersonKeys = keyof Person; // keyof 代表键值的集合，返回的是一个联合类型
// let a: PersonKeys = "age";

// // Partial 的实现
// type Partial<T> = {
//   [P in keyof T]?: T[P]; // in 表示遍历
// };
