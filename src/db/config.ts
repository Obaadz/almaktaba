import { User } from '../entities/user.entity.js';
import { DataSourceOptions } from 'typeorm';
import { Book } from '../entities/book.entity.js';
import { Library } from '../entities/library.entity.js';
import { CartItem } from '../entities/cart-item.entity.js';
import { Cart } from '../entities/cart.entity.js';
import { Order } from '../entities/order.entity.js';
import migrations from '../migrations/index.js';


const config: DataSourceOptions = {
  /*
   Note: Casting "as any" to avoid TypeORM type errors when building a generic template.
   Please import types specific to your database dialect, i. e. PostgresConnectionOptions
  */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  type: process.env.DATABASE_DIALECT as any,
  url: process.env.DATABASE_URL,
  entities: [User, Library, Book, Cart, CartItem, Order],
  migrations,
  migrationsRun: true,
  migrationsTableName: 'migrations',
  migrationsTransactionMode: 'all',
  subscribers: [],
};

export default config;
