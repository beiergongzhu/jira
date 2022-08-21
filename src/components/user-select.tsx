import React from "react";
import { useUsers } from "utils/user";
import { IdSelect } from "./id-select";

// 参数类型与 IdSelect 一致
export const UserSelect = (props: React.ComponentProps<typeof IdSelect>) => {
  const { data: users } = useUsers(); // 获取用户
  return <IdSelect options={users || []} {...props}></IdSelect>;
};
