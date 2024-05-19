import { Router } from "express";
import { AuthController } from "../controllers/auth.controller.js";

const authRouter = Router();

authRouter.post('/api/auth/login', AuthController.login);

authRouter.post('/api/auth/register', AuthController.register);

export { authRouter }