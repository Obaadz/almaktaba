import { Router } from "express";
import { LibraryController } from "../controllers/library.controller.js";

const libraryRouter = Router();

libraryRouter.get('/api/libraries', LibraryController.getAll);
libraryRouter.get('/api/libraries/:libraryId/books', LibraryController.getAllLibraryBooks);

export { libraryRouter }