import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  JoinColumn,
  OneToMany,
  AfterLoad,
  ManyToOne,
  CreateDateColumn,
  Column,
} from 'typeorm';
import { User } from './user.entity.js';
import { Library } from './library.entity.js';
import { CartItem } from './cart-item.entity.js';

@Entity({ name: 'orders' })
export class Order extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne('User', 'orders', { eager: true, cascade: true, onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  @JoinColumn()
  owner: User;

  @ManyToOne('User', 'selledOrders', { eager: true, cascade: true, onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  @JoinColumn()
  sellerUser: User;

  @ManyToOne('Library', 'orders', { eager: true, cascade: true, onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  @JoinColumn()
  sellerLibrary: Library;

  @OneToMany('CartItem', 'order', { eager: true, nullable: true, cascade: true, onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  @JoinColumn()
  cartItems: CartItem[];

  @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
  createdAt: Date

  @Column({ nullable: true })
  note: string

  @Column()
  code: string

  @Column({ default: false })
  hasBeenCompleted: boolean

  @Column({ default: false })
  hasBeenRated: boolean

  @Column({ nullable: true })
  rate: string

  @Column({ nullable: true, default: false })
  delivery: boolean

  total: string

  @AfterLoad()
  getTotal() {
    const deliveryCost = this.delivery ? 50 : 0 // 50 EGP if there is delivery

    this.total = this.cartItems ? deliveryCost + this.cartItems.reduce((acc, cartItem) => acc + cartItem.quantity * parseInt(cartItem.bookPrice), 0) + " EGP" : "0 EGP";
  }
}
