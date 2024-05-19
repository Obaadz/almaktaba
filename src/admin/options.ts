import { AdminJSOptions } from 'adminjs';
import componentLoader from './component-loader.js';
import userResource from './resources/user.resource.js';
import fileResource from './resources/file.resource.js';
import libraryResource from './resources/library.resource.js';

const options: AdminJSOptions = {
  componentLoader,
  rootPath: '/admin',
  resources: [
    userResource,
    fileResource,
    libraryResource
  ],
  databases: [],
};

export default options;
