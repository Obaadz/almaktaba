import type { Request, Response } from 'express';
import { RoomService } from '../services/room.service.js';
import { UserService } from '../services/user.service.js';

export class RoomController {
  public static async createRoom(req: Request, res: Response): Promise<void> {
    const { body } = req;


    try {
      const room = await RoomService.createRoom(req.auth.user.id, body.name);

      res.status(200).send({ data: { room }, error: null });
    } catch (error) {
      console.error(error);
      res.status(500).send({ data: null, error: { message: 'Internal server error' } });
    }
  }

  public static async getRoom(req: Request, res: Response): Promise<void> {
    const { params } = req;

    try {
      const room = await RoomService.getRoomById(Number(params.id));

      if (!room) {
        res.status(404).send({ data: null, error: { message: 'Room not found' } });
        return;
      }

      res.status(200).send({ data: { room }, error: null });
    } catch (error) {
      console.error(error);
      res.status(500).send({ data: null, error: { message: 'Internal server error' } });
    }
  }

  public static async getAllRooms(req: Request, res: Response): Promise<void> {
    try {
      const rooms = await RoomService.getAllRooms();

      const user = await UserService.getUserById(req.auth.user.id);

      rooms.forEach(room => {
        room.isOwner = room.checkIfOwner(user);
        room.hasJoined = room.checkIfJoined(user);
      })

      res.status(200).send({ data: { rooms }, error: null });
    } catch (error) {
      console.error(error);
      res.status(500).send({ data: null, error: { message: 'Internal server error' } });
    }
  }
}
