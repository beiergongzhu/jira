import React, { ReactElement } from "react";
import { Link } from "react-router-dom";
import { User } from "./search-panel";
import { Dropdown, Menu, Table, TableProps } from "antd";
import dayjs from "dayjs";
import { Pin } from "components/pin";
import { ButtonNoPadding } from "components/lib";
import { useEditProject } from "utils/project";

export interface Project {
  id: number;
  name: string;
  personId: number;
  pin: boolean;
  organization: string;
  created: number;
}

interface ListProps extends TableProps<Project> {
  // TableProps 是 antd 中的 Table的类型，里面的类型参数代表 dataSource 的类型
  users: User[];
  refresh: () => void;
  projectButton: ReactElement;
}

export const List = ({ users, ...props }: ListProps) => {
  const { mutate } = useEditProject();
  // 函数柯里化，由于我们在使用该函数时是先拿到 project.id ，后拿到 pin，所以使用柯里化（这是一种编程风格）
  const pinProject = (id: number) => (pin: boolean) =>
    mutate({ id, pin }).then((res) => props.refresh());

  return (
    <Table
      rowKey="id"
      pagination={false}
      columns={[
        {
          title: <Pin checked disabled />,
          render: (value, project) => {
            return (
              <Pin
                checked={project.pin}
                onCheckedChange={pinProject(project.id)}
              />
            );
          },
        },
        {
          title: "名称",
          dataIndex: "name",
          // localeCompore：用本地特定的顺序来比较两个字符串
          sorter: (a, b) => a.name.localeCompare(b.name), // 指定排序
          render: (name, project) => {
            return <Link to={String(project.id)}>{name}</Link>;
          },
        },
        {
          title: "部门",
          dataIndex: "organization",
        },
        {
          title: "负责人",
          dataIndex: "personId",
          render: (personId) => {
            return (
              <span>
                {users.find((user) => user.id === personId)?.name || "未知"}
              </span>
            );
          },
        },
        {
          title: "创建时间",
          dataIndex: "created",
          render: (created) => (
            <span>{created ? dayjs(created).format("YYYY-MM-DD") : "无"}</span>
          ),
        },
        {
          title: "操作",
          render: (value, project) => (
            <Dropdown
              overlay={
                <Menu>
                  <Menu.Item key="edit">{props.projectButton}</Menu.Item>
                  <Menu.Item key="edit">
                    <ButtonNoPadding type="link">编辑</ButtonNoPadding>
                  </Menu.Item>
                </Menu>
              }
            >
              <ButtonNoPadding type="link">...</ButtonNoPadding>
            </Dropdown>
          ),
        },
      ]}
      // 将 projectList 传过来的数据直接加到 Table 身上，避免了重复声明和添加属性
      {...props}
    ></Table>
  );
};
