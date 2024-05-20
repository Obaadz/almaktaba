import { Order } from '../entities/order.entity.js';
import { Cart } from '../entities/cart.entity.js';
import { BookService } from './book.service.js';
import { CartItemService } from './cart-item.service.js';
import { UserService } from './user.service.js';
import { CartService } from './cart.service.js';

export class OrderService {
  public static async createOrder(ownerId: number, note?: string | null): Promise<Order> {

    const cart = await CartService.getCartByOwnerId(ownerId)

    const order = new Order()

    order.owner = cart.owner
    order.cartItems = cart.cartItems
    order.sellerLibrary = cart.sellerLibrary
    order.sellerUser = cart.sellerUser

    if (note)
      order.note = note

    await order.save()

    return order
  }

  public static async getOrdersByOwnerId(ownerId: number): Promise<Order[]> {
    return Order.find({ where: { owner: { id: ownerId } } })
  }
}