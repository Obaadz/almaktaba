import { User } from '../entities/user.entity.js';
import { DataSourceOptions } from 'typeorm';
import { Book } from '../entities/book.entity.js';
import { Library } from '../entities/library.entity.js';
import { CartItem } from '../entities/cart-item.entity.js';
import { Cart } from '../entities/cart.entity.js';
import { Order } from '../entities/order.entity.js';
import migrations from '../migrations/index.js';
import { Room } from '../entities/room.entity.js';
import { Message } from '../entities/message.entity.js';
import { RequestBook } from '../entities/request-book.entity.js';


const config: DataSourceOptions = {
  /*
   Note: Casting "as any" to avoid TypeORM type errors when building a generic template.
   Please import types specific to your database dialect, i. e. PostgresConnectionOptions
  */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  type: process.env.DATABASE_DIALECT as any,
  host: '127.0.0.1',
  username: 'root',
  password: '12345678',
  database: 'almaktaba4',
  entities: [User, Library, Book, Cart, CartItem,
    Order, Room, Message, RequestBook
  ],
  debug: true,
  migrations,
  migrationsRun: false,
  migrationsTableName: 'migrations',
  migrationsTransactionMode: 'all',
  subscribers: [],
};

export default config;
