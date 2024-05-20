import { Cart } from '../entities/cart.entity.js';
import { BookService } from './book.service.js';
import { CartItemService } from './cart-item.service.js';
import { UserService } from './user.service.js';

export class CartService {
  public static async getCartByOwnerId(id: number): Promise<Cart | undefined> {
    return Cart.findOne({ where: { owner: { id } } })
  }

  public static async createCart(ownerId: number): Promise<Cart> {
    const owner = await UserService.getUserById(ownerId)

    const cart = new Cart()

    cart.owner = owner

    await Cart.save(cart)

    return cart
  }

  public static async addOrIncreaseBookInCartByOne(ownerId: number, bookId: number): Promise<void> {
    const cart = await CartService.getCartByOwnerId(ownerId),
      book = await BookService.getOneById(bookId)

    console.log("DEBUGER")
    console.log(await CartItemService.createCartItem(book.id, ownerId))

    if (book.library) {
      if (cart.sellerLibrary && cart.sellerLibrary.id == book.library.id) { }
      else {
        cart.sellerLibrary = book.library
        cart.sellerUser = null

        cart.cartItems = [
          await CartItemService.createCartItem(book.id, ownerId)
        ]
      }
    }
    else if (book.seller) { }

    await Cart.save(cart)
  }

  public static async deleteOrDecreaseBookInCartByOne(ownerId: number, bookId: number): Promise<void> {
    const cart = await CartService.getCartByOwnerId(ownerId),
      book = await BookService.getOneById(bookId)

    if (book.library) {
      if (cart.sellerLibrary && cart.sellerLibrary.id == book.library.id) {
        if (cart.cartItems.find(cartItem => cartItem.book.id == book.id)) {
          const cartItem = cart.cartItems.find(cartItem => cartItem.book.id == book.id)

          if (cartItem.quantity > 1)
            cartItem.quantity--
          else {
            cart.cartItems = cart.cartItems.filter(cartItem => cartItem.book.id != book.id)
            await CartItemService.deleteCartItemById(cartItem.id)
          }
        }
      }
    }
    else if (book.seller) {
      if (cart.sellerUser && cart.sellerUser.id == book.seller.id) {
        if (cart.cartItems.find(cartItem => cartItem.book.id == book.id)) {
          const cartItem = cart.cartItems.find(cartItem => cartItem.book.id == book.id)

          if (cartItem.quantity > 1)
            cartItem.quantity--
          else {
            cart.cartItems = cart.cartItems.filter(cartItem => cartItem.book.id != book.id)
            await CartItemService.deleteCartItemById(cartItem.id)
          }
        }
      }
    }

    await Cart.save(cart)
  }

  public static async deleteBookFromCart(ownerId: number, bookId: number): Promise<void> {
    const cart = await CartService.getCartByOwnerId(ownerId),
      book = await BookService.getOneById(bookId)

    if (cart.cartItems)
      cart.cartItems = cart.cartItems.filter(cartItem => cartItem.book.id != book.id)

    if (cart.cartItems.length == 0) {
      cart.sellerUser = null
      cart.sellerLibrary = null
    }

    await Cart.save(cart)
  }
}