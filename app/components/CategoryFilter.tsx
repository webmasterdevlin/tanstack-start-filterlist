import { useLoaderData, useNavigate, useRouter } from '@tanstack/react-router';
import { use } from 'react';
import { Route } from '@/routes/$tab';
import ToggleGroup from './ui/ToggleGroup';

export default function CategoryFilter() {
  const router = useRouter();
  const { categoriesPromise } = useLoaderData({ from: '__root__' });
  const categoriesMap = use(categoriesPromise);
  const navigate = useNavigate({ from: Route.fullPath });
  const { category } = Route.useSearch();

  return (
    <div data-pending={router.state.isLoading ? '' : undefined}>
      <ToggleGroup
        options={Object.values(categoriesMap).map((category) => {
          return {
            label: category.name,
            value: category.id.toString(),
          };
        })}
        selectedValues={[...(category || [])]}
        onToggle={(newCategories) => {
          navigate({
            replace: true,
            resetScroll: false,
            search: (old) => {
              return {
                ...old,
                category: newCategories,
              };
            },
          });
        }}
      />
    </div>
  );
}

export function CategoryFilterSkeleton() {
  return (
    <div className="w-fit rounded border border-gray px-4 py-2 opacity-50">
      Loading...
    </div>
  );
}
