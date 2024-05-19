import { Router } from "express";
import { AuthController } from "../controllers/auth.controller.js";

const authRouter = Router();

authRouter.post('/api/auth/login', AuthController.login);

authRouter.post('/api/auth/register', AuthController.register);

authRouter.post('/api/auth/send-forget-otp', AuthController.sendForgetOTP);

authRouter.post('/api/auth/reset-password', AuthController.resetPassword);

export { authRouter }