import { createFileRoute, redirect } from '@tanstack/react-router';
import { registerGlobalMiddleware } from '@tanstack/start';
import { authMiddleware } from '@/middleware/auth-guard';
import { loggingMiddleware } from '@/middleware/logger';

registerGlobalMiddleware({
  middleware: [authMiddleware, loggingMiddleware],
});

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
