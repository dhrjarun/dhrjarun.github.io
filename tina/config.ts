import { UsernamePasswordAuthJSProvider, TinaUserCollection } from 'tinacms-authjs/dist/tinacms';
import { defineConfig, LocalAuthProvider } from 'tinacms';

// Your hosting provider likely exposes this as an environment variable
const branch =
  process.env.GITHUB_BRANCH || process.env.VERCEL_GIT_COMMIT_REF || process.env.HEAD || 'main';

const isLocal = process.env.TINA_PUBLIC_IS_LOCAL === 'true';
// const isLocal = true;

export default defineConfig({
  authProvider: isLocal ? new LocalAuthProvider() : new UsernamePasswordAuthJSProvider(),

  // Get this from tina.io
  clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID,
  // Get this from tina.io
  token: process.env.TINA_TOKEN,

  branch,

  build: {
    outputFolder: 'admin',
    publicFolder: 'public',
  },
  media: {
    tina: {
      mediaRoot: '',
      publicFolder: 'public',
    },
  },
  // See docs on content modeling for more info on how to setup new content models: https://tina.io/docs/schema/
  schema: {
    collections: [
      TinaUserCollection,
      {
        name: 'writings',
        label: 'Writings',
        path: 'content/writings',
        format: 'mdx',
        fields: [
          {
            type: 'string',
            name: 'title',
            label: 'Title',
            isTitle: true,
            required: true,
          },
          {
            type: 'datetime',
            name: 'publishDate',
            label: 'Publish Date',
            required: true,
          },
          {
            type: 'boolean',
            name: 'draft',
            label: 'Is Draft',
            required: true,
          },
          {
            type: 'boolean',
            name: 'archive',
            label: 'Is Archive',
            required: true,
          },
          {
            type: 'rich-text',
            name: 'body',
            label: 'Body',
            isBody: true,
          },
        ],
      },
    ],
  },
});
