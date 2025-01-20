import { useNavigate, useRouter } from '@tanstack/react-router';
import { Route } from '@/routes/$tab';
import type { TaskStatus } from '@/types/task';
import SearchStatus from './ui/SearchStatus';

export default function Search() {
  const router = useRouter();
  const navigate = useNavigate({ from: Route.fullPath });
  const params = Route.useParams();
  const activeTab = params.tab as TaskStatus;
  const { q } = Route.useSearch();

  return (
    <form
      action=""
      className="relative flex w-full flex-col gap-1 sm:w-fit"
      key={activeTab}
    >
      <label className="font-semibold uppercase" htmlFor="search">
        Search
      </label>
      <input
        autoComplete="off"
        id="search"
        onChange={async (e) => {
          navigate({
            replace: true,
            resetScroll: false,
            search: (old) => {
              return {
                ...old,
                q: e.target.value ?? '',
              };
            },
          });
        }}
        defaultValue={q}
        className="w-full pl-10 sm:w-96"
        name="q"
        placeholder="Search in task title or description..."
        type="search"
      />
      <SearchStatus searching={router.state.isTransitioning} />
    </form>
  );
}

export function SearchSkeleton() {
  return (
    <input className="mt-7 w-full sm:w-96" placeholder="Loading..." disabled />
  );
}
