// app/routes/__root.tsx
import { Outlet, ScrollRestoration, createRootRoute } from '@tanstack/react-router';
import { Meta, Scripts } from '@tanstack/start';
import { lazy, Suspense, type ReactNode } from 'react';
import LoadTime from '@/components/LoadTime';
import { cn } from '@/utils/cn';

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
      <body className={'flex flex-col px-4 py-6 sm:px-16 sm:py-16 xl:px-48 2xl:px-96'}>
        <div className="group flex flex-col gap-10">
          <div className="flex flex-col gap-6">
            <h1>Project information</h1>
          </div>
          {children}
        </div>
        <LoadTime />
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}
