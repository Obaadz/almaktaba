import { Router } from "express";
import { AuthController } from "../controllers/auth.controller.js";

const authRouter = Router();

authRouter.post('/auth/login', AuthController.login);

authRouter.post('/auth/register', AuthController.register);

export { authRouter }