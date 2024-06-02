import type { Request, Response } from 'express';
import { LibraryService } from '../services/library.service.js';
import { BookService } from '../services/book.service.js';
import { getDistanceFromLatLonInMeters } from '../utils/get-distance-from-lat-lon-in-meters.js';

export class LibraryController {
  public static async getAll(req: Request, res: Response): Promise<void> {
    try {
      const libraries = await LibraryService.getAll()

      const sortedLibraries = req.query.lat && req.query.lng ? libraries.map(library => {
        const distance = getDistanceFromLatLonInMeters(
          Number(req.query.lat),
          Number(req.query.lng),
          Number(library.lat),
          Number(library.lng)
        )

        return { ...library, distance }
      }).sort((a, b) => a.distance - b.distance) : libraries

      res.status(200).send({ data: { libraries: sortedLibraries }, error: null });
    } catch (error) {
      console.error(error);
      res.status(500).send({ data: null, error: { message: 'Internal server error' } });
    }
  }

  public static async getAllLibraryBooks(req: Request, res: Response): Promise<void> {
    const { libraryId } = req.params;

    try {
      const books = await BookService.getAll({
        library: Number(libraryId),
        category: req.query.category && req.query.category != "null"
          ? Number(req.query.category) : null
      })

      res.status(200).send({ data: { books }, error: null });
    } catch (error) {
      console.error(error);
      res.status(500).send({ data: null, error: { message: 'Internal server error' } });
    }
  }
}
