import { Router } from "express";
import { LibraryController } from "../controllers/library.controller.js";

const libraryRouter = Router();

libraryRouter.get('/libraries', LibraryController.getAll);

export { libraryRouter }