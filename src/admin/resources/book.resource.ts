import uploadFeature from '@adminjs/upload';
import { AdminJSOptions } from "adminjs";
import componentLoader from '../component-loader.js';
import { Book } from '../../entities/book.entity.js';
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
          list: true,
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
          { value: 0, label: 'New' },
          { value: 1, label: 'Used' },
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