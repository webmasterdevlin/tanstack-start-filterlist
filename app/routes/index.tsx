import { createFileRoute } from '@tanstack/react-router';
import { registerGlobalMiddleware } from '@tanstack/start';
import { authMiddleware } from '@/middleware/auth-guard';
import { loggingMiddleware } from '@/middleware/logger';

registerGlobalMiddleware({
  middleware: [authMiddleware, loggingMiddleware],
});

export const Route = createFileRoute('/')({
  component: Home,
});

function Home() {
  return <h1>I am TanStack Start</h1>;
}
