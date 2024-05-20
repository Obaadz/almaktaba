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

  public static async getMyCart(req: Request, res: Response): Promise<void> {
    try {
      const cart = await CartService.getCartByOwnerId(req.auth.user.id);

      res.status(200).send({ data: { cart }, error: null });
    } catch (error) {
      console.error(error);
      res.status(500).send({ data: null, error: { message: 'Internal server error' } });
    }
  }

  public static async updateMyCart(req: Request, res: Response): Promise<void> {
    const { body } = req;

    let cart = await CartService.getCartByOwnerId(req.auth.user.id);

    if (!cart)
      cart = await CartService.createCart(req.auth.user.id);

    try {
      switch (body.action) {
        case 1: // Add or increase book quantity
          await CartService.addOrIncreaseBookInCartByOne(req.auth.user.id, body.bookId);
          break;
        case -1: // Decrease book quantity
          await CartService.deleteOrDecreaseBookInCartByOne(req.auth.user.id, body.bookId);
          break;
        case 2: // Clear cart
          await CartService.clearCart(req.auth.user.id)
          break
        case 0: // Remove book from cart
        default:
          await CartService.deleteBookFromCart(req.auth.user.id, body.bookId);
          break;

      }

      cart = await CartService.getCartByOwnerId(req.auth.user.id);

      res.status(200).send({ data: { cart }, error: null });
    } catch (error) {
      console.error(error);
      res.status(500).send({ data: null, error: { message: 'Internal server error' } });
    }
  }
}
