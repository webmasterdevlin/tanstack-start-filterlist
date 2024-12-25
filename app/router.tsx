import './globals.css';
import { createRouter as createTanStackRouter } from '@tanstack/react-router';
import { routeTree } from './routeTree.gen';

export function createRouter() {
  const router = createTanStackRouter({
    routeTree,
    defaultPreload: 'intent',
    defaultStaleTime: 1000 * 60 * 5, // 5 minutes
    defaultErrorComponent: ({ error }) => {
      return <div>{error.message}</div>;
    },
    defaultNotFoundComponent: () => {
      return <div>404 Not Found</div>;
    },
  });

  return router;
}

declare module '@tanstack/react-router' {
  interface Register {
    router: ReturnType<typeof createRouter>;
  }
}


