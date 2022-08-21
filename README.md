

# 项目记录

### 线上地址

https://sindu12jun.github.io/

### 在线文档

https://www.notion.so/React-491ad0643476437cafde50bee4dde6ed



### 常用的mock方案

1. 代码侵入：直接在代码中写死 Mock 数据，或者请求本地的 JSON 文件（和其他方案相比效果不好，与真实的Server环境的切换非常麻烦）

2. 请求拦截：Mock.js（与前端代码分离，可生成随机数据，但数据都是动态生成的假数据，无法真实模拟增删改查的情况，且只支持ajax，不支持fetch）

3. 接口管理工具：rap，swagger，moco，yapi（功能强大，后端修改接口 Mock 也跟着更改，但是配置复杂，依赖后端）

4. 本地 node 服务器：json-server（配置简单，自定义程度高，增删改查真实模拟，但无法随着后端 API 的修改而自动修改）

   

### 使用json-server来mock数据



### .env

* .env 文件是运行项目时的环境配置文件。但是在实际开发过程中，有本地开发环境、测试环境、生产环境等，不同环境对应的配置会不一样。因此，需要通过不同的.env 文件实现差异化配置（.env: 全局默认配置文件，所有环境(开发、测试、生成等）均会加载并合并该文 .env.development: 开发环境的配置文件 .env.production: 生产环境的配置文件）
* React会根据启动命令（例如npm run start，npm run build）自动加载对应的环境配置文件
* 如何查看环境变量：nodejs 顶层对象中 process 基础类下的 process.env 属性，返回包含用户环境的对象



### 使用 qs 来解决发请求时 query 参数过多的问题



### 用 Custom Hook（自定义Hook） 提取并复用组件代码



### xxx.d.ts 是用于给 js 打补丁用的，相当于一个说明书

JS文件 + .d.ts文件 === ts文件
.d.ts文件可以让js文件继续维持自己js文件的身份，而拥有ts的类型保护
一般我们写业务代码不会用到，但是点击类型跳转一般会跳转到.d.ts文件



### antd

> 我们无法直接进行主题配置，因此需要对 create-react-app 的默认配置进行自定义，这里我们使用 [craco](https://github.com/gsoft-inc/craco) （一个对 create-react-app 进行自定义配置的社区解决方案）



### CSS-in-JS



> `CSS-in-JS` 不是指某一个具体的库，而是指组织 CSS 代码的一种方式，代表库有 styled-component 和 emotion

#### 传统CSS的缺陷

* 缺乏模块组织，传统的CSS没有模块的概念，CSS-in-JS 可以用模块化的方式组织 CSS，依托于 JS 的模块化方案
* 缺乏作用域，传统的CSS只有一个全局作用域，比如说一个class可以匹配全局的任意元素。CSS-in-JS 可以通过生成独特的选择符，来实现作用域的效果
* 隐式依赖，让样式难以追踪
* 没有变量，传统的CSS规则里没有变量，但是在CSS-in-JS中可以方便地控制变量
* CSS选择器与HTML元素耦合，在CSS-in-JS 中，HTML和CSS是结合在一起的，易于修改



#### Emotion介绍

> Emotion 是目前最受欢迎的`CSS-in-JS`库之一，他还对`React`做了很好的适应，可以方便地创建 `styled component`，也支持写行内样式

下载 vscode 插件来配合使用：vscode-styled-component

示例如下：

```typescript
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
  text-align: center;
`;
```

还可以传入参数进行自定义：

```tsx
import styled from "@emotion/styled";

// 可以传入参数来进行定制
const Row = styled.div<{ gap?: number | boolean, between?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: ${(props) => (props.between ? "space-between" : undefined)};
  /* 它内部的所有直接子元素 */
  > * {
    margin-top: 0 !important;
    margin-bottom: 0 !important;
    margin-right: ${(props) =>
      typeof props.gap === "number"
        ? props.gap + "2rem"
        : props.gap
        ? "2rem"
        : undefined};
  }
`;
```



**遗忘的一些css属性**：

* background-attachment：设置背景图像是否`固定`或者随着页面的其余部分`滚动`
* background-position：设置背景图像的起始位置。left top，left center……（如果仅指定一个关键字，其他值将会是"center"）



**grid布局**

* grid-template-rows：设置每一行的高度
* grid-template-columns：设置每一列的宽度
* grid-template-areas：定位空间
* grid-column-gap：设置列间隙
* grid-row-gap：设置行间隙
* justify-items 设置水平对齐内容位置
* align-items 设置垂直对齐内容位置



**grid和flex布局各自的应用场景**

1. 要考虑是`一维布局`还是`二维布局`。一般来说，一维布局用flex，二维布局用grid
2. 从内容出发（先有一组数据，希望他们均匀的分布在容器中，由内容自己的大小决定占据的空间）还是从布局（先规划网格，然后再把元素往里面填充）出发。从内容出发用 flex 布局，从布局出发用 grid 布局



#### 使用dayjs来处理“创建时间”



### 键值对类型

> 使用 `{ [key*: string]: unknown }`来表示键值对类型

因为 object 类型指代的范围非常广。对象，函数，Regexp…… 这些都是object类型，所以我们使用 **{ [*key*: string]: unknown }** 来指代键值对的类型



### TS相关内容

#### utility type

* Utility Types：工具类型（我们常用的 utils 文件夹就是其缩写）
* 注意：JS 中的 typeof 是在 runtime 时运行的，而 TS 中的 typeof 是在静态环境运行的
* interface 不能实现 utility type
* utility type 的用法：用泛型给他传入一个其他类型，然后 utility type 对这个类型进行某种操作

```typescript
type Person = {
  name: string;
  age: number;
};
const xiaoming: Partial<Person> = { name: "xiaoming" }; //将Person类型的每一个属性都变为可选的
const shenmiren: Omit<Person, "name"> = { age: 10 }; //将Person类型中的name属性删除 
const shenmiren2: Omit<Person, "name" | "age"> = {}; //将Person类型中的name属性和age属性都删除
const xiaohong: Pick<Person, "name"> = { name: "xiaohong" }; //选出Person中的name属性

type PersonKeys = keyof Person; // keyof 代表键值的集合，返回的是一个联合类型，这里为“name” | “age”
const xiaogang: Exclude<PersonKeys, "name"> = "age"; //将联合类型中的某个类型去掉

// Parameters 用于获取一个函数的参数类型列表，返回的是一个元组
type TestArgsType = Parameters<typeof test>;
```

```typescript
// Partial的实现
type Partial<T> = {
    [P in keyof T]?: T[P];
};
```



#### 泛型

> 注意：箭头函数的泛型要写在括号之前

```typescript
const useAsync = <D>() => {};
```



#### keyof 和 typeof 操作符

在 TypeScript 中，typeof 操作符用来获取一个变量或对象的**类型**

```typescript
const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 16 },
}
type layoutType = typeof layout
```

keyof 操作符可以用于获取某种类型的所有键，其返回类型是**联合类型**

```typescript
const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 16 },
}
type layoutType = typeof layout

const test: keyof layoutType = {};  // test的类型为"labelCol" | "wrapperCol"
```



### ReactNode和ReactElement

* `ReactNode` 可以是 `ReactElement`，ReactFragment，string ，number 或者一个 ReactNode 数组，或者null，或者 undefined，或者 boolean
* `ReactElement` 是一个有 type 和 props 的对象。被createElement函数调用，根据环境设置对应的属性



### React.PropsWithChildren

因为 children 属性常用，该方法可以避免每次都要写上 children 属性，他会自动将 children 与传入的泛型类型合并

```tsx
export class ErrorBoundary extends React.Component<
  React.PropsWithChildren<{
    fallbackRender: FallbackRender;
  }>,
  { error: Error | null }
> {}
```



### as const（常量断言）

> TS 会区别对待可修改和不可修改的值的类型推断

比如当我们自定义`hook`的时候，返回一个元组（tuple），第一项为值，第二项为修改值的方法，这时 TS 会将其推断为数组而不是元组，这会导致错误的类型推断。

究其原因，TS 之所以没能将其正确的推断为元组类型是因为他认为该值仍有可能被修改（比如被 push 新的值），所以我们需要做的是告诉 TS，这个值是一个 final，其本身和属性都是**不可篡改**的，而这正是常量断言所做的事。

**常量断言**可以把一个值标记为一个不可篡改的常量，从而让`TS`以最严格的策略来进行类型推断。

#### as const与const的区别

* const常量声明是ES6的语法，对 TS 而言，他只能反映该常量本身是不可被重新赋值的，他的子属性仍然可以被修改，故 TS 只会对他们做松散的类型推断
* as const 是 TS 的语法，他告诉 TS 他所断言的值以及该值的所有层级的子属性都是不可篡改的，故对每一级子属性都会做最严格的类型推断



### React.ComponentProps

> 在对组件进行`封装和扩展`时拿到原组件的 `props` 的类型声明很有必要，所以在写组件时都会导出对应的 `props` 类型声明。 但是这个导出的类型声明使用频率又不高，还要考虑命名问题，显得非常尴尬。

因此，我们可以使用 `React.ComponentProps` 泛型工具

具体定义：

```typescript
type ComponentProps<T extends keyof JSX.IntrinsicElements | JSXElementConstructor<any>> =
  T extends JSXElementConstructor<infer P>
    ? P
    : T extends keyof JSX.IntrinsicElements
      ? JSX.IntrinsicElements[T]
      : {};
```

具体使用方法：

```tsx
import React from 'react';
import { Button } from 'antd';

type ButtonProps = React.ComponentProps<typeof Button>;
```

相比较原来的从 `antd/lib/button` 来导出，这种方式的一个好处是获取到的是真实的类型声明，而 antd 导出的类型声明有时候是不完整的，比如 `DropDownProps` 就缺少 `children`



### useState中传入函数

> useState 中传入函数的意思并不是其初始值为一个函数，而是惰性初始 state。如果初始 state 需要通过复杂计算获得，则可以传入一个函数，在函数中计算并返回初始的 state，此函数只在初始渲染时被调用：

```typescript
const [state, setState] = useState(() => {
  const initialState = someExpensiveComputation(props);
  return initialState;
});
```

如果我们需要将一个 state 的初始值赋为一个函数，那么我们需要传入一个函数，这个函数返回我们需要赋值给 state 的函数



### useEffect的清理函数执行时机

1. 如果 `useEffect` 的第 2 个参数不写，清理函数会在**下一次副作用回调函数调用时**以及**组件卸载时**执行，用于清除上一次或卸载前的副作用
2. 如果 `useEffect` 的第 2 个参数为空数组，那么会在组件卸载时执行，相当于组件的 `componetWillUnmount`。



### useMemo与useCallback

> 都是为了`依赖`而存在的，具体地说就是非基本类型的依赖，如果我们定义了非基本类型数据用作依赖，我们就需要使用 `useMemo` 或者 `useCallback`来把他们限制住，让他们不要每次页面重新渲染时都重新创建，以免造成无限循环

#### useMemo

```typescript
const memoizedValue = useMemo(() => computeExpensiveValue(a, b), [a, b]);
```

返回一个 `memoized` 值。把“创建”函数和依赖项数组作为参数传入 `useMemo`，它仅会在某个依赖项改变时才重新计算 memoized 值。这种优化有助于避免在每次渲染时都进行高开销的计算。



#### useCallback

```typescript
const memoizedCallback = useCallback(
  () => {
    doSomething(a, b);
  },
  [a, b],
);
```

返回一个 `memoized` 回调函数。把内联回调函数及依赖项数组作为参数传入 `useCallback`，它将返回该回调函数的 memoized 版本，该回调函数仅在某个依赖项改变时才会更新。



### 组件组合(component composition)

> 如果你只是想避免层层传递一些属性，组件组合（component composition）有时候是一个比 context 更好的解决方案

https://zh-hans.reactjs.org/docs/context.html#before-you-use-context

这种对组件的**控制反转**减少了在你的应用中要传递的 props 数量，这在很多场景下会使得你的代码更加干净，使你对**根组件**有更多的把控。但是，这并不适用于每一个场景：这种将逻辑提升到组件树的**更高层次**来处理，会使得这些高层组件变得**更复杂**，并且会强行将低层组件适应这样的形式，这可能不会是你想要的。



### useReducer

> useState 适用于定义单个状态，而 useReducer 适用于定义一群会互相影响的状态

是`useState` 的替代方案。它接收一个形如 `(state, action) => newState` 的 `reducer`，并返回**当前的** state 以及与其配套的 `dispatch` 方法。

```typescript
const [state, dispatch] = useReducer(reducer, initialArg, init);
```

计数器示例：

```tsx
const initialState = {count: 0};

function reducer(state, action) {
  switch (action.type) {
    case 'increment':
      return {count: state.count + 1};
    case 'decrement':
      return {count: state.count - 1};
    default:
      throw new Error();
  }
}

function Counter() {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <>
      Count: {state.count}
      <button onClick={() => dispatch({type: 'decrement'})}>-</button>
      <button onClick={() => dispatch({type: 'increment'})}>+</button>
    </>
  );
}
```



### Redux

Mixin -> Hoc 容器组件与展示组件分离（separation of container presidential）-> Render Prop -> React Hook

