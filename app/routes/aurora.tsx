import { todoQueryOptions } from '@/state/server/queries/todoQueries';
import { useSuspenseQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/aurora')({
  component: RouteComponent,
});

function RouteComponent() {
  const { data: todos } = useSuspenseQuery(todoQueryOptions());

  return (
    <div>
      <h1>Todo List</h1>
      {todos.map((todo) => (
        <div key={todo.id}>{todo.title}</div>
      ))}
    </div>
  );
}
