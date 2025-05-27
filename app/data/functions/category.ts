import { createServerFn } from '@tanstack/react-start';
import { getCategoriesMap } from '@/data/services/category';
import { loggingMiddleware } from './middleware';

export const getCategoriesMapFn = createServerFn()
  .middleware([loggingMiddleware])
  .handler(() => {
    return getCategoriesMap();
  });
