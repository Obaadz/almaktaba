import { IsEnum, IsString } from 'class-validator';
import { FILES_LINK } from '../admin/constants.js';
import { AfterLoad, BaseEntity, Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm'
import { User } from './user.entity.js';

export enum BookStatus {
  New = 0,
  Used = 1,
}

@Entity({ name: 'books' })
export class Book extends BaseEntity {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public key: string;

  @Column()
  public bucket: string;

  @Column()
  public mime: string;

  @Column()
  @IsString()
  public title: string;

  @Column()
  @IsEnum(BookStatus)
  public status: BookStatus;

  @Column()
  @IsString()
  public price: string;

  @OneToOne(() => User, { eager: true })
  @JoinColumn()
  public author: User;

  public url: string;

  @AfterLoad()
  getUrl() {
    this.url = FILES_LINK + `/${this.key}`;
  }
}