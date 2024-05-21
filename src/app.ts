import 'reflect-metadata'
import express from 'express';
import AdminJS from 'adminjs';
import { buildAuthenticatedRouter } from '@adminjs/express';

import provider from './admin/auth-provider.js';
import options from './admin/options.js';
import initializeDb from './db/index.js';
import url from 'url'
import path from 'path'
import { authRouter } from './routes/auth.route.js';
import { libraryRouter } from './routes/library.route.js';
import cors from 'cors'
import { bookRouter } from './routes/book.route.js';
import morgan from 'morgan'
import { userRouter } from './routes/user.route.js';
import { orderRouter } from './routes/order.route.js';
import { OrderService } from './services/order.service.js';

declare global {
  namespace Express {
    export interface Request {
      auth: {
        user: {
          id: number
        }
        token: string
      }
    }
  }
}

const __dirname = url.fileURLToPath(new URL('.', import.meta.url))

const port = process.env.PORT || 3000;

const start = async () => {
  const app = express();

  app.use(cors())

  await initializeDb();

  const admin = new AdminJS(options);

  if (process.env.NODE_ENV === 'production') {
    await admin.initialize();
  } else {
    admin.watch();
  }

  const router = buildAuthenticatedRouter(
    admin,
    {
      cookiePassword: process.env.COOKIE_SECRET,
      cookieName: 'adminjs',
      provider,
    },
    null,
    {
      secret: process.env.COOKIE_SECRET,
      saveUninitialized: true,
      resave: true,
    },
  );

  app.use(express.static(path.join(__dirname, '../public')));

  app.use(admin.options.rootPath, router);

  app.use(express.json())

  app.use(morgan('dev'))

  app.use(authRouter)
  app.use(libraryRouter)
  app.use(bookRouter)
  app.use(userRouter)
  app.use(orderRouter)

  OrderService.removeAllOrders()

  app.listen(port, () => {
    console.log(`AdminJS available at http://localhost:${port}${admin.options.rootPath}`);
  });
};

start();
