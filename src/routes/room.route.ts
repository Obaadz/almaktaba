import { Router } from "express";
import { ProtectMiddleware } from "../middlewares/protect.middleware.js";
import { RoomController } from "../controllers/room.controller.js";

const roomRouter = Router();

roomRouter.get('/api/rooms', RoomController.getAllRooms);

roomRouter.get('/api/rooms/:id', RoomController.getRoom);

roomRouter.post('/api/rooms', ProtectMiddleware.protect, RoomController.createRoom);


export { roomRouter }