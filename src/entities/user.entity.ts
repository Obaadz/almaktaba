import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity({ name: 'users' })
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public fullName: string;

  @Column()
  public phone: string;

  @Column()
  public email: string;

  @Column()
  public password: string;
}