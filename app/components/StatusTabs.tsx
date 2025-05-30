import { Route } from '@/routes/$tab';
import type { TaskStatus } from '@/types/task';
import { useLoaderData } from '@tanstack/react-router';
import { cn } from '@/utils/cn';
import { getCategoryColor } from '@/utils/getCategoryColor';
import Skeleton from './ui/Skeleton';
import NavTab from './ui/nav-tabs/NavTab';
import NavTabs from './ui/nav-tabs/NavTabs';
import { use } from 'react';

export default function StatusTabs() {
  const { taskSummaryPromise } = useLoaderData({ from: '__root__' });
  const taskSummary = use(taskSummaryPromise);
  const activeTab = Route.useParams().tab; // as TaskStatus; no need to cast

  const mapTasks = (status: TaskStatus) => {
    return (
      <div className="flex flex-col gap-2">
        {Object.entries(taskSummary[status]).map(([id, category]) => {
          const color = getCategoryColor(Number(id));
          return (
            <div key={id} className="flex items-center gap-2">
              <span className={cn(color, 'size-4')} />
              {category.count} {category.name}
            </div>
          );
        })}
      </div>
    );
  };

  const getTaskCount = (status: TaskStatus) => {
    return Object.values(taskSummary[status]).reduce((acc, category) => {
      return acc + category.count;
    }, 0);
  };

  return (
    <NavTabs>
      <NavTab
        href="todo"
        header={`TODO (${getTaskCount('todo')})`}
        activeTab={activeTab}
        tabId="todo"
      >
        {mapTasks('todo')}
      </NavTab>
      <NavTab
        href="inprogress"
        header={`IN PROGRESS (${getTaskCount('inprogress')})`}
        activeTab={activeTab}
        tabId="inprogress"
      >
        {mapTasks('inprogress')}
      </NavTab>
      <NavTab
        href="done"
        header={`DONE (${getTaskCount('done')})`}
        activeTab={activeTab}
        tabId="done"
      >
        {mapTasks('done')}
      </NavTab>
    </NavTabs>
  );
}

export function StatusTabsSkeleton() {
  return (
    <div className="flex gap-6 overflow-auto">
      <Skeleton className="h-[156px] sm:h-48" />
      <Skeleton className="h-[156px] sm:h-48" />
      <Skeleton className="h-[156px] sm:h-48" />
    </div>
  );
}
