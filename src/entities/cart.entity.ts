import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  JoinColumn,
  OneToOne,
  OneToMany,
  AfterLoad,
  ManyToOne,
} from 'typeorm';
import { User } from './user.entity.js';
import { Library } from './library.entity.js';
import { CartItem } from './cart-item.entity.js';

@Entity({ name: 'carts' })
export class Cart extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => User, { eager: true, nullable: false })
  @JoinColumn()
  owner: User;

  @ManyToOne('User', 'carts', { eager: true, cascade: true, })
  @JoinColumn()
  sellerUser: User;

  @ManyToOne('Library', 'carts', { eager: true, cascade: true, })
  @JoinColumn()
  sellerLibrary: Library;

  @OneToMany('CartItem', 'cart', { eager: true, nullable: true, cascade: true, })
  cartItems: CartItem[];

  total: string

  @AfterLoad()
  getTotal() {
    this.total = this.cartItems ? this.cartItems.reduce((acc, cartItem) => acc + cartItem.quantity * parseInt(cartItem.bookPrice), 0) + " EGP" : "0 EGP";
  }
}
