import type { Request, Response } from 'express';
import { CartService } from '../services/cart.service.js';
import { OrderService } from '../services/order.service.js';

export class OrderController {
  public static async createOrder(req: Request, res: Response): Promise<void> {
    const { body } = req;

    const cart = await CartService.getCartByOwnerId(req.auth.user.id);

    if (!cart || !cart.cartItems || cart.cartItems.length === 0) {
      res.status(400).send({ data: null, error: { message: 'There is no items in the cart to place order' } });
      return;
    }

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
