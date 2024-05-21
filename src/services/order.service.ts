import { generateRandomStringNumber } from '../utils/generate-random-string-number.js';
import { Order } from '../entities/order.entity.js';
import { CartService } from './cart.service.js';

export class OrderService {
  public static async createOrder(ownerId: number, note?: string | null): Promise<Order> {

    const cart = await CartService.getCartByOwnerId(ownerId)

    const order = new Order()

    order.owner = cart.owner
    order.cartItems = cart.cartItems
    order.sellerLibrary = cart.sellerLibrary
    order.sellerUser = cart.sellerUser
    order.code = generateRandomStringNumber(12)

    if (note)
      order.note = note

    await order.save()

    return order
  }

  public static async getOrdersByOwnerId(ownerId: number): Promise<Order[]> {
    return Order.find({ where: { owner: { id: ownerId } } })
  }

  public static async getOrderById(id: number): Promise<Order> {
    return Order.findOneBy({ id })
  }

  public static async removeAllOrders(): Promise<void> {
    await Order.clear()
  }
}