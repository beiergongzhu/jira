// 用于执行 异步请求 的自定义 hook 函数
import { useCallback, useReducer, useState } from "react";
import { useMountedRef } from "./index";

interface State<D> {
  error: Error | null; // 请求失败的错误
  data: D | null; // 请求成功得到的结果
  stat: "idle" | "loading" | "error" | "ssuccess"; //请求的四种状态
}

// 初始化状态
const defaultInitialState: State<null> = {
  stat: "idle",
  data: null,
  error: null,
};

// 默认配置，是否抛出异常
const defaultConfig = {
  throwOnError: false,
};

const useSafeDispatch = <T>(dispatch: (...args: T[]) => void) => {
  // 获得组件挂载的状态
  const mountedRef = useMountedRef();

  return useCallback(
    (...args: T[]) => {
      // 先判断组件不是在 已卸载 的状态，以阻止在已卸载的组件上赋值
      if (mountedRef.current) dispatch(...args);
    },
    [dispatch, mountedRef]
  );
};

export const useAsync = <D>(
  initialState?: State<D>,
  initialConfig?: typeof defaultConfig
) => {
  const config = { ...defaultConfig, ...initialConfig };
  const [state, dispatch] = useReducer(
    (state: State<D>, action: Partial<State<D>>) => ({ ...state, ...action }),
    {
      ...defaultInitialState,
      ...initialState,
    }
  );
  // 用于 避免组件在未挂载的状态下进行赋值操作
  const safeDispatch = useSafeDispatch(dispatch);

  // useState 直接传入函数的含义是：惰性初始化；所以，要用 useState保存函数，不能直接传入函数
  // https://codesandbox.io/s/blissful-water-230u4?file=/src/App.js
  // retry 被调用时，重新跑一遍 run 函数，以便于让 state 刷新
  const [retry, setRetry] = useState(() => () => {});

  // 请求成功
  const setData = useCallback(
    (data: D) => {
      safeDispatch({
        data,
        stat: "ssuccess",
        error: null,
      });
    },
    [safeDispatch]
  );

  // 请求失败
  const setError = useCallback(
    (error: Error) => {
      safeDispatch({
        error,
        stat: "error",
        data: null,
      });
    },
    [safeDispatch]
  );

  // 该函数用于触发异步请求
  const run = useCallback(
    (promise: Promise<D>, runConfig?: { retry: () => Promise<D> }) => {
      if (!promise || !promise.then) {
        // 如果没有传值或者传入的值不是promise
        throw new Error("请传入promise类型数据");
      }
      // setRetry 可以保存住上一次传入的回调函数
      setRetry(() => () => {
        if (runConfig?.retry) {
          run(runConfig?.retry(), runConfig);
        }
      });
      // 这里如果直接用到 state，就要在 useCallback 的依赖里添加 state，这样会导致无限循环（dispatch改变state，state的改变导致重新计算run函数）
      // 为了避免这种无限循环，我们可以使用 函数式更新，这样就不会直接使用到 state
      safeDispatch({ stat: "loading" }); // 刚开始的时候将状态设置为 loading
      return promise
        .then((res) => {
          setData(res);
          return res;
        })
        .catch((err) => {
          // catch 会消化异常，如果不主动抛出，外面是接收不到的
          setError(err);
          // 根据 config 决定是否抛出异常
          if (config.throwOnError) return Promise.reject(err); // 抛出异常
          return err;
        });
    },
    [config.throwOnError, setData, setError, safeDispatch]
  );

  return {
    // 四种状态的布尔值
    isIdle: state.stat === "idle",
    isLoading: state.stat === "loading",
    isSuccess: state.stat === "ssuccess",
    isError: state.stat === "error",
    run,
    setData,
    setError,
    retry,
    ...state,
  };
};
