import { createServerFn } from '@tanstack/react-start';
import { getProject } from '@/data/services/project';

export const getProjectFn = createServerFn().handler(() => {
  return getProject();
});
