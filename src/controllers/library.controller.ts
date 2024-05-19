import type { Request, Response } from 'express';
import { LibraryService } from '../services/library.service.js';

export class LibraryController {
  public static async getAll(req: Request, res: Response): Promise<void> {
    try {
      const libraries = await LibraryService.getAll()

      res.status(200).send({ data: { libraries }, error: null });
    } catch (error) {
      console.error(error);
      res.status(500).send({ data: null, error: { message: 'Internal server error' } });
    }
  }
}
