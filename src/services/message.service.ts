import { Message } from '../entities/message.entity.js';
import { UserService } from './user.service.js';
import { RoomService } from './room.service.js';

export class MessageService {
  public static async createMessage(payload: { roomId: number, senderId: number, content: string }): Promise<Message> {

    const room = await RoomService.getRoomById(payload.roomId)
    const sender = await UserService.getUserById(payload.senderId)

    const message = new Message()

    message.content = payload.content
    message.sender = sender
    message.room = room

    await message.save()

    return message
  }

  public static async getMessageById(id: number): Promise<Message> {
    return Message.findOneBy({ id })
  }
}