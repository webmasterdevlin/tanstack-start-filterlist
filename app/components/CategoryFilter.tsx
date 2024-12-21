import { useNavigate } from '@tanstack/react-router';
import React, { use, useOptimistic, useTransition } from 'react';
import { Route } from '@/routes/$tab';
import ToggleGroup from './ui/ToggleGroup';
import type { Category } from '@prisma/client';
import type { ReadonlyURLSearchParams } from 'next/navigation';

type Props = {
  categoriesPromise: Promise<Record<string, Category>>;
};

export default function CategoryFilter({ categoriesPromise }: Props) {
  const categoriesMap = use(categoriesPromise);
  const searchParams = Route.useSearch();
  const navigate = useNavigate();
  const [isPending, startTransition] = useTransition();
  const [optimisticCategories, setOptimisticCategories] = useOptimistic(searchParams.category ?? []);

  console.log('optimisticCategories ', optimisticCategories);

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
        selectedValues={optimisticCategories}
        onToggle={newCategories => {
          const params = new URLSearchParams(searchParams as ReadonlyURLSearchParams);
          params.delete('category');
          newCategories.forEach(category => {
            return params.append('category', category);
          });
          startTransition(() => {
            setOptimisticCategories(newCategories);
            navigate({
              to: `?${params.toString()}`,
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
