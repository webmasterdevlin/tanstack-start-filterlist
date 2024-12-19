import { createMiddleware } from '@tanstack/start';
import { setResponseStatus } from 'vinxi/http';

/**
 * Middleware to force authentication on a server function, and add the user to the context.
 */
export const authMiddleware = createMiddleware().server(async ({ next }) => {
  console.log('authMiddleware_active');
  const user = {
    avatar_url: 'https://avatars.githubusercontent.com/u/22025912?v=4',
    email: 'devlinduldulao@gmail.com',
    id: 1,
    name: 'Devlin Duldulao',
    setup_at: new Date(),
  };

  if (!user) {
    setResponseStatus(401);
    throw new Error('Unauthorized');
  }

  return next({ context: { user } });
});
