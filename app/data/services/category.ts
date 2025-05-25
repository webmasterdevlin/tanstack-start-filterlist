import { cache } from 'react';
import { slow } from '@/utils/slow';
import { PrismaClient } from 'generated/prisma';

const prisma = new PrismaClient();

export const getCategoriesMap = cache(async () => {
  console.log('getCategoriesMap');

  await slow(1000);

  const categories = await prisma.category.findMany();

  return categories.reduce(
    (acc, category) => {
      acc[category.id] = category;
      return acc;
    },
    {} as Record<string, (typeof categories)[0]>
  );
});
