import { Await, createFileRoute } from '@tanstack/react-router';
import { z } from 'zod';
import { ActionIcon } from '@/components/ui/icons/ActionIcon';
import { getTasksFn } from '@/data/functions/task';
import { cn } from '@/utils/cn';
import { getCategoryColor } from '@/utils/getCategoryColor';
import Skeleton from '@/components/ui/Skeleton';

export const Route = createFileRoute('/$tab/')({
  component: RouteComponent,
  preloadStaleTime: 1000 * 60 * 5,
  staleTime: 1000 * 60 * 5,
  pendingComponent: () => <Skeleton />,
  params: {
    parse: (params) => {
      return {
        tab: z.enum(['todo', 'inprogress', 'done']).parse(params.tab),
      };
    },
    stringify: ({ tab }) => {
      return { tab: `${tab}` };
    },
  },
  validateSearch: (search) => {
    return z
      .object({
        category: z
          .union([z.string(), z.array(z.string()), z.undefined()])
          .optional(),
        q: z.string().optional(),
      })
      .parse(search);
  },
  // eslint-disable-next-line sort-keys-fix/sort-keys-fix
  loaderDeps: ({ search: { category, q } }) => {
    console.log('loaderDeps', { category, q });
    return { category, q };
  },
  // eslint-disable-next-line sort-keys-fix/sort-keys-fix
  loader: ({ deps: { category, q }, params: { tab } }) => {
    console.log('loader', { category, q, tab });
    return {
      tasksPromise: getTasksFn({
        data: {
          categories: Array.isArray(category)
            ? category.map(Number)
            : category
              ? [Number(category)]
              : undefined,
          q,
          status: tab,
        },
      }),
    };
  },
});

function RouteComponent() {
  const { tasksPromise } = Route.useLoaderData();

  return (
    <Await promise={tasksPromise} fallback={<Skeleton />}>
      {(data) => {
        return (
          <div className="overflow-x-auto rounded group-has-[[data-pending]]:animate-pulse">
            <table>
              <thead>
                <tr>
                  <th scope="col">Title</th>
                  <th scope="col">Description</th>
                  <th scope="col">Category</th>
                  <th scope="col">Created Date</th>
                  <th scope="col" />
                </tr>
              </thead>
              <tbody>
                {data.map((task) => {
                  const color = getCategoryColor(task.categoryId);
                  return (
                    <tr key={task.id}>
                      <td className="font-medium">{task.title}</td>
                      <td>{task.description}</td>
                      <td>
                        <div
                          className={cn(
                            color,
                            'flex w-fit justify-center px-3 py-1 text-white dark:text-black'
                          )}
                        >
                          {task.category.name}
                        </div>
                      </td>
                      <td>{new Date(task.createdAt).toLocaleDateString()}</td>
                      <td>
                        <button aria-label="Options">
                          <ActionIcon
                            aria-hidden="true"
                            width={20}
                            height={20}
                          />
                        </button>
                      </td>
                    </tr>
                  );
                })}
                {data.length === 0 && (
                  <tr>
                    <td className="italic" colSpan={5}>
                      No tasks found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        );
      }}
    </Await>
  );
}
