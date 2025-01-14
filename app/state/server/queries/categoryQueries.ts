import { queryOptions } from '@tanstack/react-query';
import { names } from '../queryKey';
import { useServerFn } from '@tanstack/start';
import { getCategoriesMapFn } from '@/data/functions/category';

/* This function won't send an http request if not necessary.
 * So we can use this function to sync states in different components
 * */
export function categoriesQueryOptions() {
  //   const categories = useServerFn(getCategoriesMapFn);

  return queryOptions({
    queryFn: () => {
      return getCategoriesMapFn();
    },
    queryKey: [names.categories],
  });
}
