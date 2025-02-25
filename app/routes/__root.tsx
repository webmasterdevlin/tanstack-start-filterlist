import globalStyle from '../globals.css?url';
import {
  Link,
  Outlet,
  createRootRouteWithContext,
} from '@tanstack/react-router';
import { Meta, Scripts } from '@tanstack/start';
import { lazy, Suspense, type ReactNode } from 'react';
import LoadTime from '@/components/LoadTime';
import { QueryClient } from '@tanstack/react-query';

interface RootRouterContext {
  queryClient: QueryClient;
}

export const Route = createRootRouteWithContext<RootRouterContext>()({
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
      links: [
        {
          rel: 'stylesheet',
          href: globalStyle,
        },
        {
          rel: 'apple-touch-icon',
          sizes: '180x180',
          href: '/apple-touch-icon.png',
        },
        {
          rel: 'icon',
          type: 'image/png',
          sizes: '32x32',
          href: '/favicon-32x32.png',
        },
        {
          rel: 'icon',
          type: 'image/png',
          sizes: '16x16',
          href: '/favicon-16x16.png',
        },
        { rel: 'manifest', href: '/site.webmanifest', color: '#fffff' },
        { rel: 'icon', href: '/favicon.ico' },
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
          return import('@tanstack/router-devtools').then((res) => {
            return {
              default: res.TanStackRouterDevtools,
              // For Embedded Mode
              // default: res.TanStackRouterDevtoolsPanel
            };
          });
        }
      );

const ReactQueryDevtools =
  process.env.NODE_ENV === 'production'
    ? () => {
        return null;
      } // Render nothing in production
    : lazy(() =>
        // Lazy load in development
        {
          return import('@tanstack/react-query-devtools').then((res) => {
            return {
              default: res.ReactQueryDevtools,
              // For Embedded Mode
              // default: res.ReactQueryDevtoolsPanel
            };
          });
        }
      );

export function RootComponent() {
  return (
    <RootDocument>
      <div
        className={
          'flex flex-col px-4 py-6 sm:px-16 sm:py-16 xl:px-48 2xl:px-96'
        }
      >
        <div className="group flex flex-col gap-10">
          <nav className="flex gap-6">
            <Link to="/devlin">DEVLIN</Link>
            <Link to="/aurora">AURORA</Link>
          </nav>
          <div className="flex flex-col gap-6">
            <h1>Project information</h1>
          </div>
          <Outlet />
        </div>
        <LoadTime />
        <Scripts />
      </div>
      <Suspense>
        <TanStackRouterDevtools position="bottom-right" />
      </Suspense>
      <Suspense>
        <ReactQueryDevtools
          buttonPosition="bottom-left"
          initialIsOpen={false}
        />
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
        <Scripts />
      </body>
    </html>
  );
}
