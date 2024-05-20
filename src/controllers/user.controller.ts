import type { Request, Response } from 'express';
import { UserService } from '../services/user.service.js';
import { CartService } from '../services/cart.service.js';

export class UserController {
  public static async getMe(req: Request, res: Response): Promise<void> {
    try {
      const user = await UserService.getUserById(req.auth.user.id);

      res.status(200).send({ data: { user }, error: null });
    } catch (error) {
      console.error(error);
      res.status(500).send({ data: null, error: { message: 'Internal server error' } });
    }
  }

  public static async getMeCart(req: Request, res: Response): Promise<void> {
    try {
      const cart = await CartService.getCartByOwnerId(req.auth.user.id);

      res.status(200).send({ data: { cart }, error: null });
    } catch (error) {
      console.error(error);
      res.status(500).send({ data: null, error: { message: 'Internal server error' } });
    }
  }
}
