import { User } from '../entities/user.entity.js';
import { DataSourceOptions } from 'typeorm';
import { Book } from '../entities/book.entity.js';
import { Library } from '../entities/library.entity.js';
import { Entities1716127343706 } from '../migrations/1716127343706-entities.js';

const config: DataSourceOptions = {
  /*
   Note: Casting "as any" to avoid TypeORM type errors when building a generic template.
   Please import types specific to your database dialect, i. e. PostgresConnectionOptions
  */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  type: process.env.DATABASE_DIALECT as any,
  url: process.env.DATABASE_URL,
  entities: [User, Library, Book],
  migrations: [
    Entities1716127343706
  ],
  migrationsRun: true,
  migrationsTableName: 'migrations',
  migrationsTransactionMode: 'all',
  subscribers: [],
};

export default config;
