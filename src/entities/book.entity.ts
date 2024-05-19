import { IsEnum, IsString } from 'class-validator';
import { FILES_LINK } from '../admin/constants.js';
import { AfterLoad, BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { User } from './user.entity.js';
import { Library } from './library.entity.js';

export enum BookStatus {
  New = 1,
  Used = 2,
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
  public status: number;

  @Column()
  @IsString()
  public price: string;

  @ManyToOne(() => User, { eager: true, nullable: true })
  @JoinColumn()
  public seller: User;

  @ManyToOne(() => Library, { eager: true, nullable: true })
  @JoinColumn()
  public library: Library;

  public url: string;

  @AfterLoad()
  getUrl() {
    this.url = FILES_LINK + `/${this.key}`;
  }
}