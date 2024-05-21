import type { Request, Response } from 'express';
import { RoomService } from '../services/room.service.js';
import { UserService } from '../services/user.service.js';
import { MessageService } from '../services/message.service.js';

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
        res.status(404).send({ data: null, error: { message: 'Room not found or already deleted' } });
        return;
      }

      const user = await UserService.getUserById(req.auth.user.id);

      room.isOwner = room.checkIfOwner(user);
      room.hasJoined = room.checkIfJoined(user);

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

  public static async sendMessageToRoom(req: Request, res: Response): Promise<void> {
    const { body, params } = req;

    try {
      const room = await RoomService.getRoomById(Number(params.id));

      const user = await UserService.getUserById(req.auth.user.id);

      if (!room) {
        res.status(404).send({ data: null, error: { message: 'Room not found or already deleted' } });
        return;
      } else if (!room.checkIfJoined(user)) {
        res.status(400).send({ data: null, error: { message: 'You have not joined this room' } });
        return;
      }

      const message = await MessageService.createMessage({
        roomId: Number(params.id), senderId: req.auth.user.id, content: body.content
      });

      res.status(200).send({ data: { message }, error: null });
    } catch (error) {
      console.error(error);
      res.status(500).send({ data: null, error: { message: 'Internal server error' } });
    }
  }

  public static async joinRoom(req: Request, res: Response): Promise<void> {
    const { params } = req;

    try {
      let room = await RoomService.getRoomById(Number(params.id));

      const user = await UserService.getUserById(req.auth.user.id);

      if (!room) {
        res.status(404).send({ data: null, error: { message: 'Room not found or already deleted' } });
        return;
      }
      else if (room.checkIfJoined(user)) {
        res.status(400).send({ data: null, error: { message: 'You have already joined this room' } });
        return;
      }

      await RoomService.joinRoom(req.auth.user.id, Number(params.id));

      room = await RoomService.getRoomById(Number(params.id));

      res.status(200).send({ data: { room }, error: null });
    } catch (error) {
      console.error(error);
      res.status(500).send({ data: null, error: { message: 'Internal server error' } });
    }
  }

  public static async deleteRoom(req: Request, res: Response): Promise<void> {
    const { params } = req;

    try {
      const room = await RoomService.getRoomById(Number(params.id));

      const user = await UserService.getUserById(req.auth.user.id);

      if (!room) {
        res.status(404).send({ data: null, error: { message: 'Room not found or already deleted' } });
        return;
      }
      else if (!room.checkIfOwner(user)) {
        res.status(400).send({ data: null, error: { message: 'You are not the owner of this room' } });
        return;
      }

      await RoomService.deleteRoom(Number(params.id));

      res.status(200).send({ data: {}, error: null });
    } catch (error) {
      console.error(error);
      res.status(500).send({ data: null, error: { message: 'Internal server error' } });
    }
  }
}
