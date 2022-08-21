import "./wdyr";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { DevTools, loadServer } from "jira-dev-tool";
// 务必在 jira-dev-tools 后面引入 antd 的样式文件
import "antd/dist/antd.less";
import { AppProviders } from "context";
import { BrowserRouter } from "react-router-dom";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
loadServer(() => {
  root.render(
    <AppProviders>
      <BrowserRouter>
        <App />
      </BrowserRouter>
      <DevTools />
    </AppProviders>
  );
});
