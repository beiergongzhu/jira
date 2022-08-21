import styled from "@emotion/styled";
import { Spin, Typography, Button } from "antd";
import { DevTools } from "jira-dev-tool";

// 可以传入参数来进行定制
export const Row = styled.div<{
  gap?: number | boolean;
  between?: boolean;
  marginBottom?: number;
}>`
  display: flex;
  align-items: center;
  justify-content: ${(props) => (props.between ? "space-between" : undefined)};
  margin-bottom: ${(props) => props.marginBottom + "rem"};
  /* 它内部的所有直接子元素 */
  > * {
    margin-top: 0 !important;
    margin-bottom: 0 !important;
    margin-right: ${(props) =>
      typeof props.gap === "number"
        ? props.gap + "3rem"
        : props.gap
        ? "3rem"
        : undefined};
  }
`;

const FullPage = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const FullPageLoading = () => (
  <FullPage>
    <Spin size="large" />
  </FullPage>
);

export const FullPageErrorFallBack = ({ error }: { error: Error | null }) => (
  <FullPage>
    {/* 把开发者工具加到这里，不然页面上就只有错误信息，无法更改 */}
    <DevTools />
    <Typography.Text type="danger">{error?.message}</Typography.Text>
  </FullPage>
);

// 为了使 Button 对齐，经常要将 Button 的 padding设置为 0，因此可以把他抽离成一个组件
export const ButtonNoPadding = styled(Button)`
  padding: 0;
`;
