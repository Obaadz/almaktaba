import type { Request, Response } from 'express';
import { UserService } from '../services/user.service.js';
import { getValidationErrorMessage } from '../utils/get-validation-error-message.js';

export class AuthController {
  public static async login(req: Request, res: Response): Promise<void> {
    const { body } = req;

    try {
      const isPasswordCorrect = await UserService.verifyUserPassword(body);

      if (!isPasswordCorrect) {
        res.status(401).send({ data: null, error: { statusCode: 401, message: 'Invalid email or password' } });
        return;
      }

      const user = await UserService.getUserByEmail(body.email, ["id", "email", "fullName", "phone"]);

      const token = await UserService.generateToken(user);

      res.status(200).send({ data: { user, token }, error: null });
    } catch (error) {
      console.error(error);
      res.status(500).send({ data: null, error: { statusCode: 500, message: 'Internal server error' } });
    }
  }

  public static async register(req: Request, res: Response): Promise<void> {
    const { body } = req;

    try {
      let user = body.email ? await UserService.getUserByEmail(body.email) : undefined;

      if (user) {
        res.status(400).send({ data: null, error: { statusCode: 400, message: 'User with this email already registered' } });
        return;
      }

      const validationErrors = await UserService.createUser(body);

      if (validationErrors) {
        res.status(400).send({ data: null, error: { statusCode: 400, message: getValidationErrorMessage(validationErrors) } });
        return;
      }



      user = await UserService.getUserByEmail(body.email, ["id", "email", "fullName", "phone"]);
      const token = await UserService.generateToken(user);

      res.status(201).send({ data: { user, token }, error: null });
    } catch (error) {
      console.error(error);
      res.status(500).send({ data: null, error: { statusCode: 500, message: 'Internal server error' } });
    }
  }
}
