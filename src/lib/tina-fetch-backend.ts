import type { APIContext } from 'astro';

type DatabaseClient = any;

export interface BackendAuthProvider {
  initialize?: () => Promise<void>;
  isAuthorized: (request: globalThis.Request) => Promise<
    | {
        isAuthorized: true;
      }
    | {
        isAuthorized: false;
        errorMessage: string;
        errorCode: number;
      }
  >;
  extraRoutes?: {
    [key: string]: {
      secure?: boolean;
      handler: FetchRouteHandler;
    };
  };
}

export interface TinaBackendOptions {
  /**
   * The database client to use. Imported from tina/__generated__/databaseClient
   */
  databaseClient: DatabaseClient;
  /**
   * The auth provider to use
   */
  authProvider: BackendAuthProvider;
  /**
   * Options to configure the backend
   */
  options?: {
    /**
     *  The base path for the api routes (defaults to /api/tina)
     *
     * @default /api/tina
     */
    basePath?: string;
  };
}

type FetchRouteHandlerOptions = Required<TinaBackendOptions['options']>;

type FetchApiHandler = (context: APIContext) => Promise<globalThis.Response>;
type FetchRouteHandler = (
  context: APIContext,
  opts: FetchRouteHandlerOptions
) => Promise<globalThis.Response>;

export const LocalBackendAuthProvider = () =>
  ({
    isAuthorized: async () => ({ isAuthorized: true }),
  }) as BackendAuthProvider;

export function TinaFetchBackend({ authProvider, databaseClient, options }: TinaBackendOptions) {
  const { initialize, isAuthorized, extraRoutes } = authProvider;
  initialize?.().catch((e) => {
    console.error(e);
  });
  const basePath = options?.basePath
    ? `/${options.basePath.replace(/^\/?/, '').replace(/\/?$/, '')}/`
    : '/api/tina/';

  const opts: FetchRouteHandlerOptions = {
    basePath,
  };
  const handler = MakeFetchApiHandler({
    isAuthorized,
    extraRoutes,
    databaseClient,
    opts,
  });
  return handler;
}

function MakeFetchApiHandler({
  isAuthorized,
  extraRoutes,
  databaseClient,
  opts,
}: BackendAuthProvider & {
  databaseClient: DatabaseClient;
  opts: FetchRouteHandlerOptions;
}) {
  const tinaBackendHandler: FetchApiHandler = async (context) => {
    const { request } = context;

    // remove leading slash
    const path = request.url?.startsWith('/') ? request.url.slice(1) : request.url;

    // The domain is not important here, we just need to parse the pathName
    const url = new URL(path, `http://${request.headers.get('host') || 'localhost'}`);

    // Remove the basePath from the url
    const routes = url.pathname?.replace(opts?.basePath || '', '')?.split('/');

    if (typeof routes === 'string') {
      throw new Error('Please name your next api route [...routes] not [route]');
    }
    if (!routes?.length) {
      console.error(`A request was made to ${opts?.basePath} but no route was found`);

      return globalThis.Response.json({ error: 'not found' }, { status: 404 });
    }

    const allRoutes: BackendAuthProvider['extraRoutes'] = {
      gql: {
        handler: async ({ request }, _opts) => {
          if (request.method !== 'POST') {
            return globalThis.Response.json(
              {
                error: 'Method not allowed. Only POST requests are supported by /gql',
              },
              { status: 405 }
            );
          }

          const json = await request.json();

          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          // @ts-ignore
          if (!json) {
            console.error(
              'Please make sure that you have a body parser set up for your server and req.body is defined'
            );
            return globalThis.Response.json(
              {
                error: 'no body',
              },
              {
                status: 400,
              }
            );
          }
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          // @ts-ignore

          if (!json.query) {
            return globalThis.Response.json(
              {
                error: 'no query',
              },
              {
                status: 400,
              }
            );
          }
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          // @ts-ignore
          if (!json.variables) {
            return Response.json(
              {
                error: 'no variables',
              },
              {
                status: 400,
              }
            );
          }
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          // @ts-ignore
          const { query, variables } = json;

          const result = await databaseClient.request({
            query,
            variables,
            // @ts-ignore
            user: request?.session?.user,
          });
          return Response.json(result, {
            status: 200,
          });
        },
        secure: true,
      },
      ...(extraRoutes || {}),
    };

    const [action] = routes;

    const currentRoute = allRoutes[action];

    if (!currentRoute) {
      const errorMessage = `Error: ${action} not found in routes`;
      console.error(errorMessage);
      return Response.json(
        { error: errorMessage },
        {
          status: 404,
        }
      );
    }
    const { handler, secure } = currentRoute;
    if (secure) {
      const isAuth = await isAuthorized(request);
      if (isAuth.isAuthorized === false) {
        return Response.json(
          { error: isAuth.errorMessage || 'not found' },
          { status: isAuth.errorCode }
        );
      }
    }
    return handler(context, opts);
  };

  return tinaBackendHandler;
}
