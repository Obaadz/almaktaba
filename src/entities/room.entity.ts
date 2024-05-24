import { BaseEntity, Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { Message } from './message.entity.js';
import { User } from './user.entity.js';

@Entity({ name: 'rooms' })
export class Room extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToOne('User', 'ownedRooms', { eager: true, nullable: false, onDelete: 'CASCADE', onUpdate: 'CASCADE', cascade: true })
  owner: User

  @ManyToMany('User', 'joinedRooms', { eager: true, nullable: true, onDelete: 'CASCADE', onUpdate: 'CASCADE', cascade: true })
  @JoinTable()
  users: User[];

  @OneToMany('Message', 'room', { eager: true, nullable: true, onDelete: 'CASCADE', onUpdate: 'CASCADE', cascade: true })
  messages: Message[];

  checkIfJoined(user: User): boolean {
    return this.checkIfOwner(user) || this.users.some(u => u.id === user.id);
  }

  checkIfOwner(user: User): boolean {
    return this.owner.id === user.id;
  }

  isOwner: boolean;

  hasJoined: boolean;
}