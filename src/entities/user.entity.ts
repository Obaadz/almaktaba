import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import argon2 from 'argon2';
import { IsEmail, IsString, Length } from 'class-validator';
import { Cart } from './cart.entity.js';
import { Order } from './order.entity.js';

@Entity({ name: 'users' })
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Length(3, 255)
  fullName: string;

  @Column()
  @IsString()
  phone: string;

  @Column({ unique: true })
  @IsEmail()
  email: string;

  @Column()
  @IsString()
  password: string;

  @Column({ nullable: true })
  OTP: string;

  @OneToMany('Cart', 'sellerUser', { nullable: true, onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  carts: Cart[];

  @OneToMany('Order', 'owner', { nullable: true, onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  orders: Order[];

  @OneToMany('Order', 'sellerUser', { nullable: true, onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  selledOrders: Order[];

  @Column({ default: 0 })
  rateCount: number;

  @Column({ nullable: true, default: "5" })
  totalRate: string;

  checkPassword(password: string): Promise<boolean> {
    return argon2.verify(this.password, password);
  }

  checkOTP(otp: string): boolean {
    return this.OTP === otp;
  }
}