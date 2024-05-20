import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  JoinColumn,
  ManyToOne
} from 'typeorm';
import { Book } from './book.entity.js';
import { Cart } from './cart.entity.js';

@Entity({ name: 'cartItems' })
export class CartItem extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Book, { eager: true, nullable: false })
  @JoinColumn()
  book: Book;

  @Column({ nullable: true })
  bookPrice: string;

  @Column()
  quantity: number;

  @ManyToOne('Cart', 'cartItems', { lazy: true })
  cart: Cart;
}
