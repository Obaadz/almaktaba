import { IsEnum, IsString } from 'class-validator';
import { FILES_LINK } from '../admin/constants.js';
import { AfterLoad, BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { User } from './user.entity.js';
import { Library } from './library.entity.js';
import { BookCategory, BookStatus } from '../utils/enums.js';

@Entity({ name: 'books' })
export class Book extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  key: string;

  @Column()
  bucket: string;

  @Column()
  mime: string;

  @Column()
  @IsString()
  title: string;

  @Column({ nullable: true })
  @IsString()
  author: string;

  @Column({ nullable: true })
  @IsString()
  description: string;

  @Column()
  @IsEnum(BookStatus)
  status: number;

  @Column()
  @IsString()
  price: string;

  @Column({ nullable: true })
  @IsEnum(BookCategory)
  category: number;

  @Column({ nullable: true })
  salesCount: number;

  @ManyToOne(() => User, { eager: true, nullable: true })
  @JoinColumn()
  seller: User;

  @ManyToOne(() => Library, { eager: true, nullable: true })
  @JoinColumn()
  library: Library;

  url: string;

  @AfterLoad()
  getUrl() {
    this.url = FILES_LINK + `/${this.key}`;
  }
}