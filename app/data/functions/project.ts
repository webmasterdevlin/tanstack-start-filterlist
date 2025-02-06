import { createServerFn } from '@tanstack/start';
import { getProject } from '@/data/services/project';

export const getProjectFn = createServerFn().handler(() => {
  try {
    return getProject();
  } catch (error) {
    throw new Error('Server Function error. Might be from cold start');
  }
});
