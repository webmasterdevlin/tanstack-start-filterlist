import './globals.css';
import { createRouter as createTanStackRouter } from '@tanstack/react-router';
import { registerGlobalMiddleware } from '@tanstack/start';
import { authMiddleware } from './middleware/auth-guard';
import { loggingMiddleware } from './middleware/logger';
import { routeTree } from './routeTree.gen';

export function createRouter() {
  const router = createTanStackRouter({
    defaultErrorComponent: ({ error }) => {
      return <div>{error.message}</div>;
    },
    defaultNotFoundComponent: () => {
      return <div>404 Not Found</div>;
    },
    defaultPreload: 'intent',
    routeTree,
  });

  return router;
}

declare module '@tanstack/react-router' {
  interface Register {
    router: ReturnType<typeof createRouter>;
  }
}

registerGlobalMiddleware({
  middleware: [authMiddleware, loggingMiddleware],
});
