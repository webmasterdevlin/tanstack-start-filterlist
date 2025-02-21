import { createRouter as createTanStackRouter } from '@tanstack/react-router';
import { routeTree } from './routeTree.gen';
import { routerWithQueryClient } from '@tanstack/react-router-with-query';
import { QueryClient } from '@tanstack/react-query';
import { DefaultCatchBoundary } from './components/DefaultCatchBoundary';
import { NotFound } from './components/NotFound';

export function createRouter() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        // gcTime means garbage collection time and it is set to 24 hours
        gcTime: 1000 * 60 * 60 * 24,
      },
    },
  });

  return routerWithQueryClient(
    createTanStackRouter({
      routeTree,
      context: {
        queryClient,
      },
      defaultPreload: 'viewport',
      defaultStaleTime: 1000 * 60 * 5, // 5 minutes
      defaultErrorComponent: DefaultCatchBoundary,
      defaultNotFoundComponent: () => <NotFound />,
      scrollRestoration: true,
    }),
    queryClient
  );
}

declare module '@tanstack/react-router' {
  interface Register {
    router: ReturnType<typeof createRouter>;
  }
}
