import type { Request, Response } from 'express';
import { UserService } from '../services/user.service.js';
import { CartService } from '../services/cart.service.js';
import { OrderService } from '../services/order.service.js';

export class OrderController {
  public static async createOrder(req: Request, res: Response): Promise<void> {
    const { body } = req;

    try {
      const order = await OrderService.createOrder(req.auth.user.id, body.note);

      await CartService.clearCart(req.auth.user.id)

      res.status(200).send({ data: { order }, error: null });
    } catch (error) {
      console.error(error);
      res.status(500).send({ data: null, error: { message: 'Internal server error' } });
    }
  }
}
