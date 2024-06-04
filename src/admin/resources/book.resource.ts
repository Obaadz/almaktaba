import uploadFeature from '@adminjs/upload';
import { AdminJSOptions } from "adminjs";
import componentLoader from '../component-loader.js';
import { Book } from '../../entities/book.entity.js';
import { beforeUploadFile } from '../actions/before-upload-file.js';
import { BookCategory, BookStatus } from '../../utils/enums.js';
import { beforeNewOrEditBook } from '../actions/before-new-or-edit-book.js';

const localProvider = {
  bucket: 'public/files',
  opts: {
    baseUrl: '/files',
  },
};

const bookResource: AdminJSOptions['resources'][number] = {
  resource: Book,
  options: {
    properties: {
      key: {
        type: 'string',
        isVisible: {
          show: false,
          edit: false,
          filter: false,
          list: false,
        },
      },
      bucket: {
        type: 'string',
        isVisible: {
          show: false,
          edit: false,
          filter: false,
          list: false,
        },
      },
      mime: {
        type: 'string',
        isVisible: {
          show: false,
          edit: false,
          filter: false,
          list: false,
        },
      },
      url: {
        type: 'string',
        isVisible: {
          list: false,
          show: true,
          edit: false,
          filter: false,
        },
      },
      title: {
        type: 'string',
        isVisible: {
          list: true,
          show: true,
          edit: true,
          filter: false,
        },
      },
      author: {
        type: 'string',
        isVisible: {
          list: true,
          show: true,
          edit: true,
          filter: false,
        },
      },
      status: {
        type: 'string',
        isVisible: {
          list: true,
          show: true,
          edit: true,
          filter: true,
        },
        availableValues: [
          { value: BookStatus.New, label: "New" },
          { value: BookStatus.Used, label: "Used" },
        ],
      },
      category: {
        type: 'string',
        isVisible: {
          list: true,
          show: true,
          edit: true,
          filter: true,
        },
        availableValues: [
          { value: BookCategory.Drama, label: "Drama" },
          { value: BookCategory.Fantasy, label: "Fantasy" },
          { value: BookCategory.Action, label: "Action" },
          { value: BookCategory['Sci-fi'], label: 'Sci-fi' },
          { value: BookCategory.Romance, label: "Romance" },
          { value: BookCategory.War, label: "War" },
          { value: BookCategory.Psychology, label: "Psychology" },
          { value: BookCategory.Thriller, label: "Thriller" },
          { value: BookCategory['Dark fantasy'], label: 'Dark fantasy' },
          { value: BookCategory.Comedy, label: "Comedy" },
        ],
      },
      price: {
        type: 'string',
        isVisible: {
          list: true,
          show: true,
          edit: true,
          filter: false,
        },
      },
      salesCount: {
        isVisible: {
          list: false,
          show: false,
          edit: false,
          filter: false,
        },
      },
      description: {
        type: 'textarea',
        isVisible: {
          list: false,
          show: true,
          edit: true,
          filter: false,
        },
      },
      isRequested: {
        type: 'boolean',
        isVisible: {
          list: false,
          show: false,
          edit: false,
          filter: false,
        },
      }
    },
    actions: {
      new: {
        before: [beforeUploadFile, beforeNewOrEditBook],
      },
      edit: {
        before: [beforeUploadFile, beforeNewOrEditBook],
      },
    },
  },
  features: [
    uploadFeature({
      componentLoader,
      provider: { local: localProvider },
      properties: {
        key: 'key',
        bucket: 'bucket',
        mimeType: 'mime',
      }
    }),
  ],
};

export default bookResource;