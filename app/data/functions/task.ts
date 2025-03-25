import { createServerFn } from '@tanstack/react-start';
import { z } from 'zod';
import { getTasks, getTaskSummary } from '@/data/services/task';
import { taskStatusSchema } from '@/types/task';

const GetTasksValidationSchema = z.object({
  categories: z.array(z.number()).optional(),
  q: z.string().optional(),
  status: taskStatusSchema,
});

export const getTasksFn = createServerFn()
  .validator((tasks: unknown) => {
    return GetTasksValidationSchema.parse(tasks);
  })
  .handler(({ data }) => {
    return getTasks(data);
  });

export const getTaskSummaryFn = createServerFn().handler(() => {
  return getTaskSummary();
});
