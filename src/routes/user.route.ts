import { Router } from "express";
import { UserController } from "../controllers/user.controller.js";

const userRouter = Router();

userRouter.get('/api/me', UserController.getMe);

userRouter.get('/api/me/cart', UserController.getMeCart);

export { userRouter }