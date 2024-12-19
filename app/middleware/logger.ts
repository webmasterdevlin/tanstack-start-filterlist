import { createMiddleware } from '@tanstack/start';

export const loggingMiddleware = createMiddleware().server(async ({ next }) => {
  console.log('loggingMiddleware_active');
  console.log('Request received');
  const result = await next();
  console.log('Response processed');
  return result;
});
