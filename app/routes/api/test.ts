import { json } from '@tanstack/start';
import { createAPIFileRoute } from '@tanstack/start/api';

export const APIRoute = createAPIFileRoute('/api/test')({
  GET: async ({ request, params }) => {
    console.log('Hello "/api/test"!');
    console.log('request', request);
    console.log('params', params);

    return json({ message: 'Hello "/api/test"!' });
  },
});
