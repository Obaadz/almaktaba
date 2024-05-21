import { BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { Room } from './room.entity.js';
import { User } from './user.entity.js';

@Entity({ name: 'messages' })
export class Message extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  content: string;

  @ManyToOne('User', 'messages', { nullable: false, onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  @JoinColumn()
  sender: User;

  @ManyToOne('Room', 'messages', { nullable: false, onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  @JoinColumn()
  room: Room;

  @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
  createdAt: Date
}