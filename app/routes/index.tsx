import { createFileRoute, redirect } from '@tanstack/react-router';

export const Route = createFileRoute('/')({
  beforeLoad: () => {
    throw redirect({
      params: {
        tab: 'todo',
      },
      to: '/$tab',
    })
  },
  component: Home
});

function Home() {
  return <></>;
}
