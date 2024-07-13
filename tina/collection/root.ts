import type { Collection, Form, TinaCMS } from 'tinacms';

// It's not working with TINA that is why it is a function
function createRootCollection(options: { name: string; label: string; path: string }): Collection {
  return {
    name: options.name, // 'root'
    label: options.label, // 'Root'
    path: options.path, // '/'
    format: 'md',
    // match: {
    //   include: '{About/*,Now/*}',
    // },
    defaultItem() {
      return {
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
        let newPublishDate = values.publishDate;

        // TODO: change publishDate if it used to be draft
        if (form.crudType === 'create') {
          newPublishDate = new Date().toISOString();
        }

        return {
          ...values,
          publishDate: newPublishDate,
          lastUpdated: new Date().toISOString(),
        };
      },

      filename: {
        slugify: (values) => {
          return getSlug(values);
        },
      },
    },
    fields: [
      {
        type: 'datetime',
        name: 'publishDate',
        label: 'Publish Date',
        required: true,
      },
      {
        type: 'datetime',
        name: 'lastUpdated',
        label: 'Last Updated',
      },
      {
        name: 'draft',
        label: 'Draft',
        type: 'boolean',
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
}

export default createRootCollection;

function getSlug(values: any) {
  const publishDate: Date = values?.publishDate ? new Date(values?.publishDate) : new Date();

  let year = publishDate.getFullYear();
  let month: string | number = publishDate.getMonth() + 1;
  month = month < 10 ? `0${month}` : month;
  let day: string | number = publishDate.getDate();
  day = day < 10 ? `0${day}` : day;

  // Values is an object containing all the values of the form. In this case it is {title?: string, topic?: string}
  // this is when I begin the writing...
  return `${year}-${month}-${day}`;
}
