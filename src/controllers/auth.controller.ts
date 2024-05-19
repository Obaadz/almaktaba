import type { Request, Response } from 'express';
import { UserService } from '../services/user.service.js';
import { getValidationErrorMessage } from '../utils/get-validation-error-message.js';
import { generateRandomStringNumber } from '../utils/generate-random-string-number.js';
import { MailService } from '../services/mail.service.js';

export class AuthController {
  public static async login(req: Request, res: Response): Promise<void> {
    const { body } = req;

    try {
      const user = await UserService.getUserByEmail(body.email);

      if (!user || !(await user.checkPassword(body.password))) {
        res.status(401).send({ data: null, error: { message: 'Invalid email or password' } });
        return;
      }

      const token = await UserService.generateToken(user);

      res.status(200).send({ data: { user, token }, error: null });
    } catch (error) {
      console.error(error);
      res.status(500).send({ data: null, error: { message: 'Internal server error' } });
    }
  }

  public static async register(req: Request, res: Response): Promise<void> {
    const { body } = req;

    try {
      let user = body.email ? await UserService.getUserByEmail(body.email) : undefined;

      if (user) {
        res.status(400).send({ data: null, error: { message: 'User with this email already registered' } });
        return;
      }

      const validationErrors = await UserService.createUser(body);

      if (validationErrors) {
        res.status(400).send({ data: null, error: { message: getValidationErrorMessage(validationErrors) } });
        return;
      }



      user = await UserService.getUserByEmail(body.email, ["id", "email", "fullName", "phone"]);
      const token = await UserService.generateToken(user);

      res.status(201).send({ data: { user, token }, error: null });
    } catch (error) {
      console.error(error);
      res.status(500).send({ data: null, error: { message: 'Internal server error' } });
    }
  }

  public static async sendForgetOTP(req: Request, res: Response): Promise<void> {
    const { body } = req;

    try {
      const user = await UserService.getUserByEmail(body.email);

      if (!user) {
        res.status(404).send({ data: null, error: { message: 'User with this email not found' } });
        return;
      }

      const OTP = generateRandomStringNumber(4);

      await UserService.updateUser({ email: body.email }, { otp: OTP });

      MailService.sendOTP(body.email, OTP);

      res.status(200).send({ data: { user: { id: user.id, email: user.email } }, error: null });
    } catch (error) {
      console.error(error);
      res.status(500).send({ data: null, error: { message: 'Internal server error' } });
    }
  }

  public static async resetPassword(req: Request, res: Response): Promise<void> {
    const { body } = req;

    try {
      const user = await UserService.getUserByEmail(body.email);

      if (!user) {
        res.status(404).send({ data: null, error: { message: 'User with this email not found' } });
        return;
      } else if (!body.otp || !user.checkOTP(body.otp)) {
        res.status(400).send({ data: null, error: { message: 'Invalid OTP' } });
        return;
      }

      await UserService.updateUser({ email: body.email }, { password: body.password, otp: null });

      res.status(200).send({ data: { user: { id: user.id, email: user.email } }, error: null });
    } catch (error) {
      console.error(error);
      res.status(500).send({ data: null, error: { message: 'Internal server error' } });
    }
  }
}
