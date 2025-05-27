import { createRouter as createTanStackRouter } from '@tanstack/react-router';
import { routeTree } from './routeTree.gen';
import { DefaultCatchBoundary } from './components/DefaultCatchBoundary';
import { NotFound } from './components/NotFound';

export function createRouter() {
  return createTanStackRouter({
    routeTree,
    defaultPreload: 'viewport',
    defaultStaleTime: 1000 * 60 * 5, // 5 minutes
    defaultErrorComponent: DefaultCatchBoundary,
    defaultNotFoundComponent: () => <NotFound />,
    scrollRestoration: true,
  });
}

declare module '@tanstack/react-router' {
  interface Register {
    router: ReturnType<typeof createRouter>;
  }
}
// This router configuration will dictate the behavior of TanStack Router used within Start. Here, you can configure everything from the default preloading functionality to caching staleness.
