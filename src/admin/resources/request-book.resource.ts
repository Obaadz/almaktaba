import uploadFeature from '@adminjs/upload';
import { AdminJSOptions } from "adminjs";
import componentLoader from '../component-loader.js';
import { beforeUploadFile2 } from '../actions/before-upload-file2.js';
import { RequestBook } from '../../entities/request-book.entity.js';

const localProvider = {
  bucket: 'public/files2',
  opts: {
    baseUrl: '/files2',
  },
};

const requestBookResource: AdminJSOptions['resources'][number] = {
  resource: RequestBook,
  options: {
    sort: {
      direction: "desc",
      sortBy: "createdAt",
    },
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
      description: {
        type: 'textarea',
        isVisible: {
          list: false,
          show: true,
          edit: true,
          filter: false,
        },
      },
      createdAt: {
        isVisible: {
          show: true,
          edit: false,
          filter: true,
          list: true,
        },
      },
    },
    actions: {
      new: {
        before: [beforeUploadFile2]
      },
      edit: {
        before: [beforeUploadFile2],
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

export default requestBookResource;