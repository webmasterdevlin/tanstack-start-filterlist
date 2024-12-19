export function getCategoryColor(categoryId: number) {
  const colors = [
    'bg-primary dark:bg-white',
    'bg-primary-dark dark:bg-primary-light',
    'bg-primary-darker dark:bg-primary-lighter',
    'bg-accent-grayblue dark:bg-accent-grayblue-light',
    'bg-accent-purple dark:bg-accent-purple-light',
  ];
  return colors[categoryId] || 'bg-gray';
}
