import { User } from "./screens/project-list/search-panel";
// 在真实环境中，如果使用 firebase 这种第三方 autu 服务的话，本文件不需要

// 获取环境变量
const apiUrl = process.env.REACT_APP_API_URL;

const localStorageKey = "__auth_provider_token__";

// 获取 token
export const getToken = () => window.localStorage.getItem(localStorageKey);

// 将 token 存入 localStorage
export const handleUserResponse = ({ user }: { user: User }) => {
  window.localStorage.setItem(localStorageKey, user.token || "");
  return user;
};

// 登录
export const login = (data: { username: string; password: string }) => {
  return fetch(`${apiUrl}/login`, {
    method: "post",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  }).then(async (response) => {
    // response.ok 为一个布尔值
    if (response.ok) {
      // json方法返回一个被解析为 JSON 格式的 promise 对象，这可以是任何可以由 JSON 表示的东西 - 一个 object，一个 array，一个 string，一个 number...
      return handleUserResponse(await response.json());
    } else {
      return Promise.reject(await response.json());
    }
  });
};

// 注册
export const register = (data: { username: string; password: string }) => {
  return fetch(`${apiUrl}/register`, {
    method: "post",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  }).then(async (response) => {
    // response.ok 为一个布尔值
    if (response.ok) {
      // json方法返回一个被解析为 JSON 格式的 promise 对象，这可以是任何可以由 JSON 表示的东西 - 一个 object，一个 array，一个 string，一个 number...
      return handleUserResponse(await response.json());
    } else {
      return Promise.reject(await response.json());
    }
  });
};

// 退出登录（清除 token）
export const logout = async () =>
  window.localStorage.removeItem(localStorageKey);
