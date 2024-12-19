import { z } from 'zod';

export const taskStatusSchema = z.enum(['todo', 'inprogress', 'done']);
export type TaskStatus = z.infer<typeof taskStatusSchema>;

export type TaskSummary = Record<TaskStatus, Record<number, { count: number; name: string }>>;
