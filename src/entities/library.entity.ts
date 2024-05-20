import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { Cart } from './cart.entity.js';
import { Order } from './order.entity.js';

@Entity({ name: 'libraries' })
export class Library extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  lat: string;

  @Column()
  lng: string;

  @OneToMany('Cart', 'sellerLibrary', { nullable: true, })
  carts: Cart[];

  @OneToMany('Order', 'sellerLibrary', { nullable: true, })
  orders: Order[];
}