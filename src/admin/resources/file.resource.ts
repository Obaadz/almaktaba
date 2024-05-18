import uploadFeature from '@adminjs/upload';
import { AdminJSOptions } from "adminjs";
import componentLoader from '../component-loader.js';
import { File } from '../../entities/file.entity.js';
import { beforeUploadFile } from '../actions/before-upload-file.js';

const localProvider = {
  bucket: 'public/files',
  opts: {
    baseUrl: '/files',
  },
};

const fileResource: AdminJSOptions['resources'][number] = {
  resource: File,
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
      comment: {
        type: 'textarea',
        isSortable: false,
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

export default fileResource;