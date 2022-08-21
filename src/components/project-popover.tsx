import React, { ReactElement } from "react";
import { List, Popover, Typography } from "antd";
import { useProjects } from "utils/project";
import styled from "@emotion/styled";

export const ProjectPopover = (props: { projectButton: ReactElement }) => {
  const { data: projects } = useProjects();
  // 从 projects 中得到被收藏的项目数组
  const pinnedProjects = projects?.filter((project) => project.pin);

  const content = (
    <ContentContainer>
      <Typography.Text type="success">我的收藏</Typography.Text>
      <List>
        {pinnedProjects?.map((project) => (
          <List.Item key={project.id}>{project.name}</List.Item>
        ))}
      </List>
      {props.projectButton}
    </ContentContainer>
  );

  return (
    <Popover placement="bottom" content={content}>
      <span>项目</span>
    </Popover>
  );
};

const ContentContainer = styled.div`
  min-width: 30rem;
`;
