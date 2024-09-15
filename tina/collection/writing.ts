import type { Collection, Form, TinaCMS } from 'tinacms';

const WritingCollection: Collection = {
  name: 'writing',
  label: 'Writing',
  path: 'Writing',
  format: 'md',
  defaultItem() {
    return {
      title: 'New Post',
      draft: false,
      archive: false,
      publishDate: new Date().toISOString(),
    };
  },
  ui: {
    beforeSubmit: async ({
      form,
      cms,
      values,
    }: {
      form: Form;
      cms: TinaCMS;
      values: Record<string, any>;
    }) => {
      if (form.crudType === 'create') {
        const newPublishDate = new Date().toISOString();

        return {
          ...values,
          publishDate: newPublishDate,
        };
      }
    },

    filename: {
      slugify: (values) => {
        return getSlug(values);
      },
    },
  },
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
      name: 'draft',
      label: 'Draft',
      type: 'boolean',
      required: true,
      description: 'If this is checked the post will not be published',
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

export default WritingCollection;

function getSlug(values: any) {
  const publishDate: Date = values?.publishDate ? new Date(values?.publishDate) : new Date();

  let year = publishDate.getFullYear();
  let month: string | number = publishDate.getMonth() + 1;
  month = month < 10 ? `0${month}` : `${month}`;

  // Values is an object containing all the values of the form. In this case it is {title?: string, topic?: string}
  return `${year}-${month}-${values?.title?.toLowerCase().replace(/ /g, '-')}`;
}
