import { createServerFn } from '@tanstack/react-start';
import { getCategoriesMap } from '@/data/services/category';

export const getCategoriesMapFn = createServerFn().handler(() => {
  return getCategoriesMap();
});
