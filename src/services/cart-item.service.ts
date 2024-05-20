import { CartItem } from '../entities/cart-item.entity.js';
import { BookService } from './book.service.js';
import { CartService } from './cart.service.js';

export class CartItemService {
  public static async getCartItemByBookId(id: number): Promise<CartItem | undefined> {
    return CartItem.findOne({ where: { book: { id } } })
  }

  public static async createCartItem(bookId: number, ownerId: number): Promise<CartItem> {
    const book = await BookService.getOneById(bookId),
      cart = await CartService.getCartByOwnerId(ownerId)

    const cartItem = new CartItem()

    cartItem.book = book
    cartItem.bookPrice = book.price
    cartItem.cart = cart
    cartItem.quantity = 1

    await CartItem.save(cartItem)

    return cartItem
  }

  public static async deleteCartItemById(id: number): Promise<void> {
    await CartItem.delete({ id })
  }
}