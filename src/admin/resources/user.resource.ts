import { AdminJSOptions } from "adminjs";
import componentLoader from '../component-loader.js';
import { User } from '../../entities/user.entity.js';
import argon2 from 'argon2';
import passwordsFeature from '@adminjs/passwords';

const userResource: AdminJSOptions['resources'][number] = {
  resource: User,
  options: {
    properties: {
      password: { isVisible: false },
      OTP: { isVisible: false },
      rateCount: {
        isVisible: {
          show: true,
          edit: false,
          filter: true,
          list: true,
        },
      },
      totalRate: {
        isVisible: {
          show: true,
          edit: false,
          filter: true,
          list: true,
        },
      },
    },
  },
  features: [
    passwordsFeature({
      componentLoader,
      properties: {
        encryptedPassword: 'password',
        password: 'newPassword'
      },
      hash: argon2.hash,
    })
  ]
}

export default userResource;