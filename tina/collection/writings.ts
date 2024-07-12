import type { Collection } from 'tinacms';

const Writings: Collection = {
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
};

export default Writings;
