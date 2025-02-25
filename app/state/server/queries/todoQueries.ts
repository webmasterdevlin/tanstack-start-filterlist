import { queryOptions } from '@tanstack/react-query';
import { names } from '../queryKey';
import { getTodoFn } from '@/data/functions/todo';

/* This function won't send an http request if not necessary.
 * So we can use this function to sync states in different components
 * */
export function todoQueryOptions() {
  return queryOptions({
    queryFn: async () => {
      return await getTodoFn();
    },
    queryKey: [names.todo],
  }); 
}
