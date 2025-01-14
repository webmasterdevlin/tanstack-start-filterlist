import { queryOptions } from '@tanstack/react-query';
import { names } from '../queryKey';
import { useServerFn } from '@tanstack/start';
import { getTasksFn, getTaskSummaryFn } from '@/data/functions/task';

export function tasksQueryOptions() {
  const tasks = useServerFn(getTasksFn);

  return queryOptions({
    queryFn: () => {
      return tasks();
    },
    queryKey: [names.tasks],
  });
}

export function taskSummaryQueryOptions() {
  //   const taskSummary = useServerFn(getTaskSummaryFn);

  return queryOptions({
    queryFn: () => {
      return getTaskSummaryFn();
    },
    queryKey: [names.taskSummary],
  });
}
