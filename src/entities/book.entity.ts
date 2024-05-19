import { IsEnum, IsString } from 'class-validator';
import { FILES_LINK } from '../admin/constants.js';
import { AfterLoad, BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { User } from './user.entity.js';
import { Library } from './library.entity.js';

export enum BookStatus {
  New = 1,
  Used = 2,
}

export enum BookCategory {
  Drama = 1,
  Fantasy = 2,
  Action = 3,
  "Sci-fi" = 4,
  Romance = 5,
  War = 6,
  Psychology = 7,
  Thriller = 8,
  "Dark fantasy" = 9,
  Comedy = 10
}

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

  @Column()
  @IsEnum(BookStatus)
  status: number;

  @Column()
  @IsString()
  price: string;

  @Column()
  @IsEnum(BookCategory)
  category: number;

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