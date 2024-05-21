import { Room } from '../entities/room.entity.js';
import { UserService } from './user.service.js';

export class RoomService {
  public static async createRoom(ownerId: number, name: string): Promise<Room> {

    const room = new Room()

    const owner = await UserService.getUserById(ownerId)

    room.owner = owner
    room.name = name

    await room.save()

    return room
  }

  public static async getRoomById(id: number): Promise<Room> {
    return Room.findOneBy({ id })
  }

  public static async getAllRooms(): Promise<Room[]> {
    return Room.find()
  }

  public static async removeAllRooms(): Promise<void> {
    await Room.clear()
  }
}