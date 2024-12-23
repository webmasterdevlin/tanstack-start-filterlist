// app/routes/__root.tsx
import { Outlet, ScrollRestoration, createRootRoute } from '@tanstack/react-router';
import { Meta, Scripts } from '@tanstack/start';
import { lazy, Suspense, type ReactNode } from 'react';
import CategoryFilter, { CategoryFilterSkeleton } from '@/components/CategoryFilter';
import LoadTime from '@/components/LoadTime';
import ProjectInfo from '@/components/ProjectInfo';
import Search, { SearchSkeleton } from '@/components/Search';
import StatusTabs, { StatusTabsSkeleton } from '@/components/StatusTabs';
import { getCategoriesMapFn } from '@/functions/category';
import { getProjectFn } from '@/functions/project';
import { getTaskSummaryFn } from '@/functions/task';

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
  loader: async () => {
    return {
      categories: getCategoriesMapFn(),
      project: await getProjectFn(),
      taskSummary: getTaskSummaryFn(),
    };
  }
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

  const { taskSummary, categories } = Route.useLoaderData();

  return (
    <RootDocument>
      <div className={'flex flex-col px-4 py-6 sm:px-16 sm:py-16 xl:px-48 2xl:px-96'}>
        <div className="group flex flex-col gap-10">
          <div className="flex flex-col gap-6">
            <h1>Project information</h1>
            <ProjectInfo />
          </div>
          <div className="flex flex-col gap-6">
            <h2>Task list</h2>
            <Suspense fallback={<StatusTabsSkeleton />}>
              <StatusTabs taskSummaryPromise={taskSummary} />
            </Suspense>
          </div>
          <div className="h-[1px] bg-primary" />
          <Suspense fallback={<SearchSkeleton />}>
            <Search />
          </Suspense>
          <Suspense fallback={<CategoryFilterSkeleton />}>
            <CategoryFilter categoriesPromise={categories} />
          </Suspense>
          <Outlet />
        </div>
        <LoadTime />
        <ScrollRestoration />
        <Scripts />
      </div>
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
