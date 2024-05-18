import { FILES_LINK } from '../admin/constants.js';
import { AfterLoad, BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity({ name: 'files' })
export class File extends BaseEntity {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public key: string;

  @Column()
  public bucket: string;

  @Column()
  public mime: string;

  @Column({ nullable: true })
  public comment: string;

  public url: string;

  @AfterLoad()
  getUrl() {
    this.url = FILES_LINK + `/${this.key}`;
  }
}