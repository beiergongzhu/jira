// 自己实现一个简单的 错误边界
// 官方库：react-error-boundary  https://github.com/bvaughn/react-error-boundary

import React from "react";

type FallbackRender = (props: { error: Error | null }) => React.ReactElement;

// 只有 class 组件才可以成为错误边界组件；大多数情况下, 你只需要声明一次错误边界组件, 并在整个应用中使用它
// Component 的类型参数第一个为 props，第二个为 state
export class ErrorBoundary extends React.Component<
  React.PropsWithChildren<{
    fallbackRender: FallbackRender;
  }>,
  { error: Error | null }
> {
  state = {
    error: null,
  };

  // 当子组件抛出异常，这里会接收到并且调用该方法
  static getDerivedStateFromError(error: Error) {
    return { error }; // 这里的 error 就会赋值给 state 里的 error
  }

  render() {
    const { error } = this.state;
    const { fallbackRender, children } = this.props;

    // 如果有错误，就返回 fallbackRender
    if (error) {
      return fallbackRender({ error });
    }
    // 如果没有错误，就直接返回 children
    return children;
  }
}
