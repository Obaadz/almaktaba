import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  JoinColumn,
  OneToOne,
  OneToMany,
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

  @OneToOne(() => User, { eager: true, nullable: true })
  @JoinColumn()
  sellerUser: User;

  @OneToOne(() => Library, { eager: true, nullable: true })
  @JoinColumn()
  sellerLibrary: Library;

  @OneToMany('CartItem', 'cart', { eager: true, nullable: true, cascade: true })
  cartitems: CartItem[];

  get total(): string {
    return this.cartitems.reduce((acc, item) => acc + item.quantity * Number(item.book.price), 0) + " EGP";
  }
}
