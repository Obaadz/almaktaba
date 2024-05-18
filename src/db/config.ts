import { Entities1716070296333 } from '../migrations/1716070296333-entities.js';
import { User } from '../entities/user.entity.js';
import { DataSourceOptions } from 'typeorm';
import { File } from '../entities/file.entity.js';
import { Entities1716072325952 } from '../migrations/1716072325952-entities.js';
import { Entities1716072743443 } from '../migrations/1716072743443-entities.js';

const config: DataSourceOptions = {
  /*
   Note: Casting "as any" to avoid TypeORM type errors when building a generic template.
   Please import types specific to your database dialect, i. e. PostgresConnectionOptions
  */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  type: process.env.DATABASE_DIALECT as any,
  url: process.env.DATABASE_URL,
  entities: [User, File],
  migrations: [Entities1716070296333, Entities1716072325952, Entities1716072743443],
  migrationsRun: true,
  migrationsTableName: 'migrations',
  migrationsTransactionMode: 'all',
  subscribers: [],
};

export default config;
