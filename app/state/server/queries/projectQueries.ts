import { getProjectFn } from "@/data/functions/project";
import { queryOptions } from "@tanstack/react-query";
import { names } from "../queryKey";
import { useServerFn } from "@tanstack/start";

/* This function won't send an http request if not necessary.
 * So we can use this function to sync states in different components
 * */
export function projectQueryOptions() {
  const project = useServerFn(getProjectFn);

  return queryOptions({
    queryFn: () => {
      return project();
    },
    queryKey: [names.project],
  });
}
