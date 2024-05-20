import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm'
import argon2 from 'argon2';
import { IsEmail, IsOptional, IsString, Length } from 'class-validator';

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

  checkPassword(password: string): Promise<boolean> {
    return argon2.verify(this.password, password);
  }

  checkOTP(otp: string): boolean {
    return this.OTP === otp;
  }
}