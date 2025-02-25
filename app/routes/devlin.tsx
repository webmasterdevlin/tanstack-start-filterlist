import { todoQueryOptions } from '@/state/server/queries/todoQueries';
import { createFileRoute, Link } from '@tanstack/react-router';

export const Route = createFileRoute('/devlin')({
  component: RouteComponent,
  loader: ({ context: { queryClient } }) => {
    queryClient.ensureQueryData(todoQueryOptions());
  },
});

function RouteComponent() {
  return (
    <h1>
      Hello "/devlin"! <Link to="/devlin">DEVLLIN</Link>
      <Link to="/aurora">AURORA</Link>
    </h1>
  );
}
