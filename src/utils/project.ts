import { useEffect, useCallback } from "react";
import { Project } from "screens/project-list/list";
import { cleanObject } from "utils";
import { useHttp } from "utils/http";
import { useAsync } from "./use-async";

// Partial 用于将某个类型中的所有属性都变为可选的
export const useProjects = (param?: Partial<Project>) => {
  const client = useHttp();
  const { run, ...result } = useAsync<Project[]>();

  const fetchProjects = useCallback(
    () => client("projects", { data: cleanObject(param || {}) }),
    [param, client]
  );

  useEffect(() => {
    run(fetchProjects(), { retry: fetchProjects });
  }, [param, run, fetchProjects]);

  return result;
};

// 编辑项目
// 之所以采用在内部定义函数并返回的方式，是因为 hook（包括自定义hook）不允许在一个回调函数内部被调用
export const useEditProject = () => {
  const { run, ...asyncResult } = useAsync();
  const client = useHttp();
  const mutate = (params: Partial<Project>) => {
    return run(
      client(`projects/${params.id}`, { method: "patch", data: params })
    );
  };

  return { mutate, ...asyncResult };
};

// 添加项目
export const useAddProject = () => {
  const { run, ...asyncResult } = useAsync();
  const client = useHttp();
  const mutate = (params: Partial<Project>) => {
    return run(
      client(`projects/${params.id}`, { method: "post", data: params })
    );
  };

  return { mutate, ...asyncResult };
};
