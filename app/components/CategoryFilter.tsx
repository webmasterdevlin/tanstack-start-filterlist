import { useNavigate } from '@tanstack/react-router';
import { use, useTransition } from 'react';
import { Route } from '@/routes/$tab';
import ToggleGroup from './ui/ToggleGroup';
import type { Category } from '@prisma/client';

type Props = {
  categoriesPromise: Promise<Record<string, Category>>;
};

export default function CategoryFilter({ categoriesPromise }: Props) {
  const categoriesMap = use(categoriesPromise);
  const navigate = useNavigate({ from: Route.fullPath });
  const { category } = Route.useSearch();
  const [isPending, startTransition] = useTransition();

  return (
    <div data-pending={isPending ? '' : undefined}>
      <ToggleGroup
        toggleKey="category"
        options={Object.values(categoriesMap).map(category => {
          return {
            label: category.name,
            value: category.id.toString(),
          };
        })}
        selectedValues={[...category || []]}
        onToggle={newCategories => {
          startTransition(() => {
            navigate({
              replace: true,
              search: old => {
                return {
                  ...old,
                  category: newCategories,
                };
              },
            });
          });
        }}
      />
    </div>
  );
}

export function CategoryFilterSkeleton() {
  return <div className="w-fit rounded border border-gray px-4 py-2 opacity-50">Loading...</div>;
}
