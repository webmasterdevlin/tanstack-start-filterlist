import { createMiddleware } from '@tanstack/react-start';

// a quick middleware demo
export const loggingMiddleware = createMiddleware().server(
  async ({ next, data }) => {
    // console.info('Request received:', data);
    const result = await next();
    // console.info('Response processed:', result);
    return result;
  }
);
