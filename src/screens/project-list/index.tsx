import React, { ReactElement } from "react";
import { List } from "./list";
import { SearchPanel } from "./search-panel";
import { useProjectsSearchParams } from "./util";
import styled from "@emotion/styled";
import { useDebounce, useDocumentTitle } from "utils";
import { useProjects } from "utils/project";
import { useUsers } from "utils/user";
import { Row } from "components/lib";

export const ProjectListScreen = (props: { projectButton: ReactElement }) => {
  useDocumentTitle("项目列表", false); // 用于更改页面 title

  const [param, setParam] = useProjectsSearchParams();
  // 用于防抖
  const debouncedParam = useDebounce(param, 200);

  const { isLoading, data: list, retry } = useProjects(debouncedParam);

  // 获取用户的操作只需在页面初始化渲染时执行一次
  const { data: users } = useUsers();

  return (
    <Container>
      <Row between>
        <h1>项目列表</h1>
        {props.projectButton}
      </Row>
      <SearchPanel param={param} setParam={setParam} users={users || []} />
      <List
        projectButton={props.projectButton}
        refresh={retry}
        loading={isLoading}
        dataSource={list || []}
        users={users || []}
      />
    </Container>
  );
};

// ProjectListScreen.whyDidYouRender = true;

const Container = styled.div`
  padding: 3.2rem;
`;
