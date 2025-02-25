import { createServerFn } from '@tanstack/start';

export const getTodoFn = createServerFn().handler(() => {
  const todos = [
    {
      id: 1,
      title: 'Todo 1',
      completed: false,
    },
    {
      id: 2,
      title: 'Todo 2',
      completed: false,
    },
    {
      id: 3,
      title: 'Todo 3',
      completed: false,
    },
  ];
  console.log('TODOS from server function:', todos);

  return todos;
});
