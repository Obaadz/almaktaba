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

    await cart.save()

    return cart
  }

  public static async addOrIncreaseBookInCartByOne(ownerId: number, bookId: number): Promise<void> {
    const cart = await CartService.getCartByOwnerId(ownerId),
      book = await BookService.getOneById(bookId)

    if (book.library) {
      if (cart.sellerLibrary && cart.sellerLibrary.id == book.library.id) {
        let cartItem = cart.cartItems.find((item) => item.book.id == book.id)

        if (!cartItem) {
          cartItem = await CartItemService.createCartItem(book.id, ownerId)

          cart.cartItems.push(cartItem)
        }
        else {
          cartItem.quantity++

          await cartItem.save()
        }
      }
      else {
        cart.sellerLibrary = book.library

        await CartItemService.createCartItem(book.id, ownerId)
      }
    }
    else if (book.seller) {
      if (cart.sellerUser && cart.sellerUser.id == book.seller.id) {
        let cartItem = cart.cartItems.find((item) => item.book.id == book.id)

        if (!cartItem) {
          cartItem = await CartItemService.createCartItem(book.id, ownerId)

          cart.cartItems.push(cartItem)
        }
        else {
          cartItem.quantity++

          await cartItem.save()
        }
      }
      else {
        cart.sellerUser = book.seller
        cart.sellerLibrary = null

        cart.cartItems = [
          await CartItemService.createCartItem(book.id, ownerId)
        ]
      }
    }

    await cart.save()
  }

  public static async deleteOrDecreaseBookInCartByOne(ownerId: number, bookId: number): Promise<void> {
    const cart = await CartService.getCartByOwnerId(ownerId),
      book = await BookService.getOneById(bookId)

    if (cart.cartItems.length) {
      let cartItem = cart.cartItems.find((item) => item.book.id == book.id)

      if (cartItem) {
        if (cartItem.quantity > 1) {
          cartItem.quantity--;
          console.log("I'mHere")
          await cartItem.save()
        }
        else {
          if (cart.cartItems.length == 1) {
            cart.sellerUser = null
            cart.sellerLibrary = null
          }

          cart.cartItems = cart.cartItems.filter((item) => item.id != cartItem.id)

          await CartItemService.deleteCartItemById(cartItem.id)

        }
      }
    }

    await cart.save()
  }

  public static async deleteBookFromCart(ownerId: number, bookId: number): Promise<void> {
    const cart = await CartService.getCartByOwnerId(ownerId),
      book = await BookService.getOneById(bookId)

    if (cart.cartItems.length) {
      let cartItem = cart.cartItems.find((item) => item.book.id == book.id)

      if (cartItem) {
        if (cart.cartItems.length == 1) {
          cart.sellerUser = null
          cart.sellerLibrary = null
        }

        await CartItemService.deleteCartItemById(cartItem.id)
      }
    }

    await cart.save()
  }

  public static async clearCart(ownerId: number): Promise<void> {
    const cart = await CartService.getCartByOwnerId(ownerId);

    cart.sellerUser = null
    cart.sellerLibrary = null
    cart.cartItems = []

    await cart.save()
  }
}