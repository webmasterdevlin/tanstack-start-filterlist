import { createServerFn } from '@tanstack/start';
import { getCategoriesMap } from '@/data/services/category';

export const getCategoriesMapFn = createServerFn().handler(() => {
  return getCategoriesMap();
});
