import { ReactElement, useState } from "react";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import { ProjectListScreen } from "screens/project-list";
import { ProjectScreen } from "screens/project";
import { KanbanScreen } from "screens/kanban";
import { EpicScreen } from "screens/epic";
import { ProjectModal } from "screens/project-list/project-modal";
import { useAuth } from "context/auth-context";
import styled from "@emotion/styled";
import { ButtonNoPadding, Row } from "components/lib";
import { ProjectPopover } from "components/project-popover";
import { ReactComponent as SoftwareLogo } from "assets/software-logo.svg";
import { Dropdown, Menu, Button } from "antd";
import { PoweroffOutlined, UserOutlined } from "@ant-design/icons";

export const AuthenticatedApp = () => {
  // prop drilling(钻)

  // 控制抽屉的打开与关闭
  const [projectModalOpen, setProjectModalOpen] = useState(false);

  return (
    <Container>
      <PageHeader
        // 组件组合，在这里直接将 jsx 传递给子组件，避免了层层传递 setProjectModalOpen 函数
        projectButton={
          <ButtonNoPadding
            onClick={() => setProjectModalOpen(true)}
            type="link"
          >
            创建项目
          </ButtonNoPadding>
        }
      />
      <Main>
        <Routes>
          <Route path="/" element={<Navigate to="/projects" />}></Route>
          <Route
            path="/projects"
            element={
              <ProjectListScreen
                projectButton={
                  <ButtonNoPadding
                    onClick={() => setProjectModalOpen(true)}
                    type="link"
                  >
                    创建项目
                  </ButtonNoPadding>
                }
              />
            }
          ></Route>
          <Route path="/projects/:projectId" element={<ProjectScreen />}>
            <Route path="kanban" element={<KanbanScreen />}></Route>
            <Route path="epic" element={<EpicScreen />}></Route>
          </Route>
        </Routes>
      </Main>
      <ProjectModal
        projectModalOpen={projectModalOpen}
        onClose={() => setProjectModalOpen(false)}
      />
    </Container>
  );
};

const PageHeader = (props: { projectButton: ReactElement }) => {
  const navigate = useNavigate();

  return (
    <Header between={true}>
      <HeaderLeft gap={true}>
        <SoftwareLogo
          width="18rem"
          color="rgb(38,132,255)"
          onClick={() => {
            navigate("/");
          }}
        />
        <ProjectPopover {...props} />
        <span>用户</span>
      </HeaderLeft>
      <HeaderRight>
        {/* 下拉菜单 */}
        <User />
      </HeaderRight>
    </Header>
  );
};

const User = () => {
  const { logout, user } = useAuth();
  return (
    <Dropdown
      overlay={
        <Menu>
          <Menu.Item key="logout">
            <Button type="link" onClick={logout} style={{ color: "#FF4D4F" }}>
              登出
              <PoweroffOutlined />
            </Button>
          </Menu.Item>
        </Menu>
      }
    >
      <Button type="link" onClick={(e) => e.preventDefault()}>
        Hi, {user?.name} <UserOutlined />
      </Button>
    </Dropdown>
  );
};

// temporal dead zone（暂时性死区）
// 我们先在 AuthenticatedApp 中使用了 Container，然后才在这里定义
// 之所以没有报错，是因为我们并没有执行 AuthenticatedApp，所以没有读取 Container，因而没有报错
const Container = styled.div`
  height: 100vh;
`;

const Header = styled(Row)`
  padding: 3.2rem;
  box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.1);
  z-index: 1;
  cursor: pointer;
`;

const HeaderLeft = styled(Row)``;

const HeaderRight = styled.header``;

const Main = styled.main``;
