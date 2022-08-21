import { useEffect, useRef, useState } from "react";

// 对对象中的值进行判断，以便于删除掉无意义的值
export const isVoid = (value: unknown) =>
  value === undefined || value === null || value === "";

// 该函数用于去除那些为值空的参数
// 在一个函数里，改变传入的对象本身是不好的
export const cleanObject = (object: { [key: string]: unknown }) => {
  const result = { ...object };
  Object.keys(result).forEach((key) => {
    const value = result[key];
    // 这里要注意 value 为 0 的情况，0 是一个有效值，但是在此处还是会进入删除的逻辑中
    if (isVoid(value)) {
      delete result[key]; // 删除值为空的属性，避免传递给服务器产生歧义
    }
  });
  return result;
};

// 自定义 Hook（前面必须加 use）

// 项目中会有很多只需要请求一次的内容，所以对 useEffect 进行一下封装
export const useMount = (callback: () => void) => {
  // hook 函数只能在另外的 hook 函数中，或者组件中运行，所以此处的自定义 hook 前面一定要加上 use，否则会被认为不是 hook
  useEffect(() => {
    callback();
    // TODO 依赖项里如果加上 callback 会造成无限循环，这和 useCallback 以及 useMemo 有关
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};

// 防抖（避免输入框输入时发太多次请求）
// 这里的 ?: 表示该值是可选的，要么不传，传了就必须是 number 类型
export const useDebounce = <V>(value: V, delay?: number) => {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    // 每次 value 或 delay 变化之后，设置一个定时器
    const timeout = setTimeout(() => setDebouncedValue(value), delay);
    // 清理副作用的函数：每次在 上一个 useEffect 处理完以后再运行
    // 清理函数会在 下一次副作用回调函数调用之前 以及 组件卸载时 执行
    return () => clearTimeout(timeout);
  }, [value, delay]);

  return debouncedValue;
};

export const useArray = <T>(initialArray: T[]) => {
  const [value, setValue] = useState(initialArray);
  return {
    value,
    setValue,
    add: (item: T) => setValue([...value, item]),
    clear: () => setValue([]),
    removeIndex: (index: number) => {
      const copy = [...value];
      copy.splice(index, 1);
      setValue(copy);
    },
  };
};

// 该自定义 hook 用于实现 title 的改变
// keepOnUnmount 表示页面卸载时是否保留当前 title
export const useDocumentTitle = (
  title: string,
  keepOnUnmount: boolean = true
) => {
  // 页面加载时：旧title
  // 页面加载后：新title

  // 使用 useRef 是为了保存住原先的 title
  // 原理：useRef 返回的 ref 对象在组件的整个生命周期内保持不变
  const oldTitle = useRef(document.title).current;

  useEffect(() => {
    document.title = title;
  }, [title]);

  useEffect(() => {
    // 返回的函数会在页面卸载时调用
    return () => {
      if (!keepOnUnmount) {
        // 如果 useEffect 不指定依赖，读到的就是旧的 title
        document.title = oldTitle;
      }
    };
  }, [oldTitle, keepOnUnmount]);
};

// 用于返回组件的挂载状态，如果还没挂载或者已经卸载，返回 false，否则返回 true
export const useMountedRef = () => {
  const mountedRef = useRef(false); // 初始值为 false

  useEffect(() => {
    mountedRef.current = true; // 页面加载完成时调用，设置为 true，表示已挂载
    // 返回的函数在 组件卸载时调用，设置为 false，表示未挂载（已卸载）
    return () => {
      mountedRef.current = false;
    };
  }, []);

  return mountedRef;
};
