import { useMemo } from "react";
import { URLSearchParamsInit, useSearchParams } from "react-router-dom";
import { cleanObject } from "./index";

// 作用：返回页面 url 中指定键对应的值
export const useUrlQueryParam = <K extends string>(keys: K[]) => {
  const [searchParams, setSearchParams] = useSearchParams(); // 返回的值不能直接读取，而要使用 get 方法来获取

  // useMemo返回一个 memoized 值。它仅会在某个依赖项改变时才重新计算 memoized 值。这种优化有助于避免在每次渲染时都进行高开销的计算
  // 只有当 searchParams 变化时才会重新计算 memoRes 的值
  const memoRes = useMemo(() => {
    const result = {} as { [key in K]: string };
    keys.forEach((key) => {
      Object.assign(result, { [key]: searchParams.get(key) });
    });
    return result;
  }, [searchParams]);

  // 这里不直接返回 setSearchParams 是为了做更加严格的类型限制
  return [
    memoRes,
    (params: Partial<{ [key in K]: unknown }>) => {
      // iterator: https://codesandbox.io/s/upbeat-wood-bum3j?file=/src/index,js
      // Object.fromEntries() 方法把键值对列表转换为一个对象，其参数为一个可迭代对象
      const o = cleanObject({
        ...Object.fromEntries(searchParams),
        ...params,
      }) as URLSearchParamsInit;
      setSearchParams(o);
    },
  ] as const; // 常量断言：避免错误的类型推断
};
