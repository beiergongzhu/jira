import React from "react";
import { Link, Outlet } from "react-router-dom";

export const ProjectScreen = () => {
  return (
    <div>
      <h1>ProjectScreen</h1>
      <Link to="kanban">看板</Link>
      <Link to="epic">任务组</Link>

      {/* 二级路由出口 */}
      <Outlet></Outlet>
    </div>
  );
};
