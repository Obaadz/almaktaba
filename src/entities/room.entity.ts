import { BaseEntity, Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { Message } from './message.entity.js';
import { User } from './user.entity.js';

@Entity({ name: 'rooms' })
export class Room extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToOne('User', 'ownedRooms', { eager: true, nullable: false, onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  owner: User

  @ManyToMany('User', 'joinedRooms', { eager: true, nullable: true, onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  @JoinTable()
  users: User[];

  @OneToMany('Message', 'room', { eager: true, nullable: true, onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  messages: Message[];
}