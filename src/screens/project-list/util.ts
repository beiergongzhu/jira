// 项目列表搜索的参数
// 将对参数 param 的处理抽象出来
import { useUrlQueryParam } from "utils/url";
import { useMemo } from "react";

// 这里如果不对 useUrlQueryParam 函数做处理的话，由于每次渲染时的 param都不是同一个对象，再加上 useDebounce 函数的处理，会导致页面无限循环
// 对象导致的无限循环演示：https://codesandbox.io/s/keen-wave-tlz9s?file=/src/App.js
// 基本类型可以放到依赖里，组件状态可以放到依赖里，但是非组件状态的对象绝不可以放到依赖里
export const useProjectsSearchParams = () => {
  const [param, setParam] = useUrlQueryParam(["name", "personId"]);

  // 这里注意，由于我们返回了一个新的对象，param 是经过 useMemo 处理过的，但是返回的这个新对象也必须要用 useMemo来处理，否则还是会造成无限循环
  return [
    useMemo(
      () => ({
        ...param,
        personId: Number(param.personId) || undefined, // 将 param 中的 personId 由 string类型转化为 number类型或者 undefined
      }),
      [param]
    ),
    setParam,
  ] as const;
};
