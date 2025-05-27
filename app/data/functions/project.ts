import { createServerFn } from '@tanstack/react-start';
import { getProject } from '@/data/services/project';
import { loggingMiddleware } from './middleware';

export const getProjectFn = createServerFn()
  .middleware([loggingMiddleware])
  .handler(() => {
    return getProject();
  });
