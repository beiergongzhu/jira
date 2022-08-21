import React, { ReactNode, useContext } from "react";
import * as auth from "auth-provider";
import { User } from "screens/project-list/search-panel";
import { http } from "utils/http";
import { useMount } from "utils";
import { useAsync } from "utils/use-async";
import { FullPageLoading } from "components/lib";
import { FullPageErrorFallBack } from "../components/lib";

interface AuthForm {
  username: string;
  password: string;
}

// bootstrap：启动，初始化；该函数用于 在页面刷新时初始化 user
// 如果 localStorage 中存在 token（说明用户已经登录且并未退出），就将其赋值给 user 并返回
const bootstrapUser = async () => {
  let user = null;
  const token = auth.getToken(); // 在 localStorage 中取到 token
  if (token) {
    // 如果用户已经登录了且未登出，那么 token 一直在 localStorage里
    // 如果有 token 的话，就向 me 接口发送请求获取 user 数据
    const data = await http("me", { token });
    user = data.user;
  }
  return user;
};

// 参数表示默认值，只有当组件所处的树中没有匹配到 Provider 时，其默认值才会生效
const AuthContext = React.createContext<
  | {
      user: User | null;
      login: (form: AuthForm) => Promise<void>;
      register: (form: AuthForm) => Promise<void>;
      logout: () => Promise<void>;
    }
  | undefined
>(undefined);

AuthContext.displayName = "AuthContext"; // React DevTools使用该字符串来确定 context 要显示的内容

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const {
    data: user,
    error,
    isLoading,
    isIdle,
    isError,
    run,
    setData: setUser,
  } = useAsync<User | null>();

  const login = (form: AuthForm) =>
    auth.login(form).then((res) => setUser(res));

  const register = (form: AuthForm) =>
    auth.register(form).then((res) => setUser(res));

  const logout = () => auth.logout().then(() => setUser(null)); // 重置 user

  // 只在页面初次渲染时执行一次
  useMount(() => {
    run(bootstrapUser());
  });

  // 如果不加上 loading 组件或展示错误信息的组件，刷新之后就会先跳到登录页再跳回来，这样不美观
  // 如果正在加载状态，就展示 loading 组件
  if (isIdle || isLoading) {
    return <FullPageLoading />;
  }

  if (isError) {
    // 如果请求失败，就返回展示错误信息的组件
    return <FullPageErrorFallBack error={error} />;
  }

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// 便于所有组件都能够获取到 user,login 这几个属性
export const useAuth = () => {
  const context = useContext(AuthContext);
  // 如果context不存在，则说明 AuthContxt 不存在，即用户没有在 AuthProvider 中使用 useAuth，则抛出错误
  if (!context) {
    throw new Error("useAuth必须在AuthProvider中使用");
  }
  return context;
};
