import { AdminJSOptions } from 'adminjs';
import componentLoader from './component-loader.js';
import userResource from './resources/user.resource.js';
import bookResource from './resources/book.resource.js';
import libraryResource from './resources/library.resource.js';
import orderResource from './resources/order.resource.js';

const options: AdminJSOptions = {
  componentLoader,
  rootPath: '/admin',
  resources: [
    userResource,
    libraryResource,
    bookResource,
    orderResource
  ],
  databases: [],
};

export default options;
