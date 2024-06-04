import { IsString } from 'class-validator';
import { FILES_LINK2 } from '../admin/constants.js';
import { AfterLoad, BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { User } from './user.entity.js';

@Entity({ name: 'requestBooks' })
export class RequestBook extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  key: string;

  @Column({ nullable: true })
  bucket: string;

  @Column({ nullable: true })
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

  @ManyToOne(() => User, { eager: true, nullable: true })
  @JoinColumn()
  user: User;

  @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
  createdAt: Date

  url: string;

  @AfterLoad()
  getUrl() {
    this.url = FILES_LINK2 + `/${this.key}`;
  }
}