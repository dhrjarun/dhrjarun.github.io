import CredentialsProvider from '@auth/core/providers/credentials';
import type { BackendAuthProvider } from '../tina-fetch-backend';
import { TINA_CREDENTIALS_PROVIDER_NAME } from './tina-cms';
import { getSession, AstroAuth } from '../../lib/astro-auth';
import type { AuthConfig } from '@auth/core';

const authenticate = async (databaseClient: any, username: string, password: string) => {
  try {
    const result = await databaseClient.authenticate({ username, password });
    return result.data?.authenticate || null;
  } catch (e) {
    console.error(e);
  }
  return null;
};

const TinaAuthJSOptions = ({
  databaseClient,
  uidProp = 'sub',
  debug = false,
  overrides,
  secret,
  providers,
}: {
  databaseClient: any; // TODO can we type this?
  uidProp?: string;
  debug?: boolean;
  overrides?: AuthConfig;
  providers?: AuthConfig['providers'];
  secret: string;
}): AuthConfig => ({
  callbacks: {
    jwt: async ({ token: jwt, account }) => {
      if (account) {
        if (debug) {
          console.table(jwt);
        }
        // only set for newly created jwts
        try {
          if (jwt?.[uidProp]) {
            const sub = jwt[uidProp];
            const result = await databaseClient.authorize({ sub });
            jwt.role = !!result.data?.authorize ? 'user' : 'guest';
            jwt.passwordChangeRequired =
              result.data?.authorize?._password?.passwordChangeRequired || false;
          } else if (debug) {
            console.log(`jwt missing specified uidProp: ${uidProp}`);
          }
        } catch (error) {
          console.log(error);
        }
        if (jwt.role === undefined) {
          jwt.role = 'guest';
        }
      }
      return jwt;
    },
    session: async ({ session, token: jwt }) => {
      // forward the role to the session
      (session.user as any).role = jwt.role;
      (session.user as any).passwordChangeRequired = jwt.passwordChangeRequired;
      (session.user as any)[uidProp] = jwt[uidProp];
      return session;
    },
  },
  session: { strategy: 'jwt' },
  secret,
  providers: (providers || [TinaCredentialsProvider({ databaseClient })]) as any,
  ...overrides,
});

const TinaCredentialsProvider = ({
  databaseClient,
  name = TINA_CREDENTIALS_PROVIDER_NAME,
}: {
  databaseClient: any; // TODO can we type this?
  name?: string;
}) => {
  const p = CredentialsProvider({
    credentials: {
      username: { label: 'Username', type: 'text' },
      password: { label: 'Password', type: 'password' },
    },
    authorize: async (credentials) =>
      authenticate(databaseClient, credentials.username as any, credentials.password as any),
  });
  p.name = name;
  return p;
};

const AuthJsBackendAuthProvider = ({ authOptions }: { authOptions: AuthConfig }) => {
  const authProvider: BackendAuthProvider = {
    initialize: async () => {
      if (!authOptions.providers?.length) {
        throw new Error('No auth providers specified');
      }
      const [provider, ...rest] = authOptions.providers;
      if (
        rest.length > 0 ||
        provider.type !== 'credentials' ||
        provider.name !== TINA_CREDENTIALS_PROVIDER_NAME
      ) {
        console.warn(
          `WARNING: Catch-all api route ['/api/tina/*'] with specified Auth.js provider ['${provider.name}'] not supported. See https://tina.io/docs/self-hosted/overview/#customprovider for more information.`
        );
      }
    },
    isAuthorized: async (req: globalThis.Request) => {
      // @ts-ignore
      const session = await getSession(req, authOptions);

      // @ts-ignore
      if (!req.session) {
        Object.defineProperty(req, 'session', {
          value: session,
          writable: false,
        });
      }

      if (!session?.user) {
        return {
          errorCode: 401,
          errorMessage: 'Unauthorized',
          isAuthorized: false,
        };
      }
      if ((session?.user as any).role !== 'user') {
        return {
          errorCode: 403,
          errorMessage: 'Forbidden',
          isAuthorized: false,
        };
      }
      return { isAuthorized: true };
    },
    extraRoutes: {
      auth: {
        secure: false,

        handler: async (context, opts) => {
          const { request } = context;
          // The domain is not important here, we just need to parse the pathName
          const url = new URL(request.url, `http://${request.headers.get('host') || 'localhost'}`);

          // extract next auth sub routes
          //   const authSubRoutes = url.pathname
          //     ?.replace(`${opts?.basePath}auth/`, '') // basePath always has leading and trailing slash
          //     ?.split('/');

          // This is required for NextAuth to work properly
          // @ts-ignore
          //   req.query.nextauth = authSubRoutes;

          return AstroAuth(authOptions, opts?.basePath).POST(context) as any;
        },
      },
    },
  };
  return authProvider;
};
export { TinaCredentialsProvider, TinaAuthJSOptions, AuthJsBackendAuthProvider };
