import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm'
import argon2 from 'argon2';
import { IsEmail, IsString, Length } from 'class-validator';

@Entity({ name: 'users' })
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  @Length(3, 255)
  public fullName: string;

  @Column()
  @IsString()
  public phone: string;

  @Column({ unique: true })
  @IsEmail()
  public email: string;

  @Column()
  @IsString()
  public password: string;

  checkPassword(password: string): Promise<boolean> {
    return argon2.verify(this.password, password);
  }
}