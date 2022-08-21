import React from "react";
import { Raw } from "types";
import { Select } from "antd";

// 该组件是为了解决 select 选择器的 value 属性值的 number和 string类型问题
// 因为服务器返回的 id 通常为 number类型，而 select 的 value属性又通常为 string类型，所以会造成冲突

// 获取到 antd 的 Select 组件的 props 的类型
type SelectProps = React.ComponentProps<typeof Select>;

interface IdSelectProps
  extends Omit<SelectProps, "value" | "onChange" | "options"> {
  value: Raw | undefined | null;
  onChange: (value?: number) => void;
  defaultOptionName?: string; // 默认属性值
  options?: { name: string; id: number }[];
}

// value 可以传入多种类型的值，onChange只会回调 number | undefined 类型
// 当 isNaN(Number(value)) 为 true 的时候，代表选择默认类型
// 当选择默认类型的时候，onChange会回调 undefined
export const IdSelect = (props: IdSelectProps) => {
  const { value, onChange, defaultOptionName, options, ...restProps } = props;
  return (
    <Select
      // 这里 value这样写是为了在 options数据还没有请求到时，先展示默认值
      value={options?.length ? toNumber(value) : 0}
      onChange={(value) => onChange(toNumber(value) || undefined)}
      {...restProps}
    >
      {defaultOptionName ? (
        <Select.Option value={0}>{defaultOptionName}</Select.Option>
      ) : null}
      {options?.map((option) => (
        <Select.Option value={option.id} key={option.id}>
          {option.name}
        </Select.Option>
      ))}
    </Select>
  );
};

// 将传入的值转换为 number 类型，如果是无意义的值，就转换为 0
const toNumber = (value: unknown) => (isNaN(Number(value)) ? 0 : Number(value));
