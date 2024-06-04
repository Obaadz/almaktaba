import { AdminJSOptions } from 'adminjs';
import componentLoader from './component-loader.js';
import userResource from './resources/user.resource.js';
import bookResource from './resources/book.resource.js';
import libraryResource from './resources/library.resource.js';
import orderResource from './resources/order.resource.js';
import cartResource from './resources/cart.resource.js';
import cartItemResource from './resources/cart-item.resource.js';
import messageResource from './resources/message.resource.js';
import roomResource from './resources/room.resource.js';
import requestBookResource from './resources/request-book.resource.js';

const options: AdminJSOptions = {
  componentLoader,
  rootPath: '/admin',
  resources: [
    userResource,
    libraryResource,
    bookResource,
    orderResource,
    cartResource,
    cartItemResource,
    roomResource,
    messageResource,
    requestBookResource
  ],
  databases: [],
};

export default options;
