import uploadFeature from '@adminjs/upload';
import { AdminJSOptions } from "adminjs";
import componentLoader from '../component-loader.js';
import { Book, BookCategory, BookStatus } from '../../entities/book.entity.js';
import { beforeUploadFile } from '../actions/before-upload-file.js';

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
      status: {
        type: 'string',
        isVisible: {
          list: true,
          show: true,
          edit: true,
          filter: true,
        },
        availableValues: [
          { value: 1, label: "New" },
          { value: 2, label: "Used" },
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
          { value: 1, label: "Drama" },
          { value: 2, label: "Fantasy" },
          { value: 3, label: "Action" },
          { value: 4, label: 'Sci-fi' },
          { value: 5, label: "Romance" },
          { value: 6, label: "War" },
          { value: 7, label: "Psychology" },
          { value: 8, label: "Thriller" },
          { value: 9, label: 'Dark fantasy' },
          { value: 10, label: "Comedy" },
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
    },
    actions: {
      new: {
        before: [beforeUploadFile],
      },
      edit: {
        before: [beforeUploadFile],
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