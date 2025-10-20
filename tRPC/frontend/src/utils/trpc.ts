import { createTRPCReact } from '@trpc/react-query';
import { httpBatchLink } from '@trpc/client';
import superjson from 'superjson';
import type { AppRouter } from '../../../backend/src/router';

// Create tRPC client
export const trpc = createTRPCReact<AppRouter>();

// Create tRPC client config
export const trpcClient = trpc.createClient({
  links: [
    httpBatchLink({
      url: 'http://localhost:3000/trpc',
    }),
  ],
  transformer: superjson,
});