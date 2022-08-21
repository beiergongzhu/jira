import React from "react";
import { Rate } from "antd";

// 当对组件进行扩展或封装时，声明的参数类型一定要继承原组件的参数类型
interface PinProps extends React.ComponentProps<typeof Rate> {
  checked: boolean;
  onCheckedChange?: (checked: boolean) => void;
}

export const Pin = (props: PinProps) => {
  const { checked, onCheckedChange, ...restProps } = props;

  return (
    <Rate
      count={1}
      value={checked ? 1 : 0}
      onChange={(value) => onCheckedChange?.(!!value)} // !!value可以将value转换为布尔值
      {...restProps}
    />
  );
};
