import { Router } from "express";
import { ProtectMiddleware } from "../middlewares/protect.middleware.js";
import { RoomController } from "../controllers/room.controller.js";

const roomRouter = Router();

roomRouter.get('/api/rooms', ProtectMiddleware.protect, RoomController.getAllRooms);

roomRouter.get('/api/rooms/:id', ProtectMiddleware.protect, RoomController.getRoom);

roomRouter.post('/api/rooms', ProtectMiddleware.protect, RoomController.createRoom);

roomRouter.post('/api/rooms/:id/messages', ProtectMiddleware.protect, RoomController.sendMessageToRoom);

roomRouter.delete('/api/rooms/:id', ProtectMiddleware.protect, RoomController.deleteRoom);

roomRouter.patch('/api/rooms/:id/join', ProtectMiddleware.protect, RoomController.joinRoom);

export { roomRouter }