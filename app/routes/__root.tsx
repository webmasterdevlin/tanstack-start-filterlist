// app/routes/__root.tsx
import { Outlet, ScrollRestoration, createRootRoute } from '@tanstack/react-router';
import { Meta, Scripts } from '@tanstack/start';
import { lazy, Suspense, type ReactNode } from 'react';

export const Route = createRootRoute({
  component: RootComponent,
  head: () => {
    return {
      meta: [
        {
          charSet: 'utf-8',
        },
        {
          content: 'width=device-width, initial-scale=1',
          name: 'viewport',
        },
        {
          title: 'TanStack Start Starter',
        },
      ],
    };
  },
});

const TanStackRouterDevtools =
  process.env.NODE_ENV === 'production'
    ? () => {
        return null;
      } // Render nothing in production
    : lazy(() =>
        // Lazy load in development
        {
          return import('@tanstack/router-devtools').then(res => {
            return {
              default: res.TanStackRouterDevtools,
              // For Embedded Mode
              // default: res.TanStackRouterDevtoolsPanel
            };
          });
        },
      );

function RootComponent() {
  return (
    <RootDocument>
      <Outlet />
      <Suspense>
        <TanStackRouterDevtools />
      </Suspense>
    </RootDocument>
  );
}

function RootDocument({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html>
      <head>
        <Meta />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}
