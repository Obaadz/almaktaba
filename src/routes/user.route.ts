import { Router } from "express";
import { UserController } from "../controllers/user.controller.js";
import { ProtectMiddleware } from "../middlewares/protect.middleware.js";

const userRouter = Router();

userRouter.get('/api/me', ProtectMiddleware.protect, UserController.getMe);

userRouter.get('/api/me/cart', ProtectMiddleware.protect, UserController.getMeCart);

export { userRouter }