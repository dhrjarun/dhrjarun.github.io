import type { APIRoute } from 'astro';
import { TinaFetchBackend, LocalBackendAuthProvider } from '../../../lib/tina-fetch-backend';
import { AuthJsBackendAuthProvider, TinaAuthJSOptions } from '../../../lib/tina-auth';

import databaseClient from '../../../../tina/__generated__/databaseClient';

const isLocal = process.env.TINA_PUBLIC_IS_LOCAL === 'true';

export const config = {
  runtime: 'nodejs',
};

const handler = TinaFetchBackend({
  authProvider: isLocal
    ? LocalBackendAuthProvider()
    : AuthJsBackendAuthProvider({
        authOptions: TinaAuthJSOptions({
          databaseClient: databaseClient,
          secret: process.env.NEXTAUTH_SECRET!,
        }),
      }),
  databaseClient,
});

export const ALL: APIRoute = (context) => {
  return handler(context);
};
