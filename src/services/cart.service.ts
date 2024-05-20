import { FindOneOptions } from 'typeorm';
import { Cart } from '../entities/cart.entity.js';

export class CartService {
  public static async getCartByOwnerId(id: number, select?: FindOneOptions<Cart>['select']): Promise<Cart | undefined> {
    return Cart.findOne({ where: { owner: { id } }, select })
  }
}