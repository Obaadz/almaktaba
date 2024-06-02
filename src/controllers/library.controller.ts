import type { Request, Response } from 'express';
import { LibraryService } from '../services/library.service.js';
import { BookService } from '../services/book.service.js';
import { getDistanceFromLatLonInMeters } from '../utils/get-distance-from-lat-lon-in-meters.js';
import { BookStatus, Filter } from '../utils/enums.js';

export class LibraryController {
  public static async getAll(req: Request, res: Response): Promise<void> {
    try {
      const libraries = await LibraryService.getAll()

      const sortedLibraries = req.query.lat && req.query.lng ? libraries.map(library => {
        const distanceInMeters = getDistanceFromLatLonInMeters(
          Number(req.query.lat),
          Number(req.query.lng),
          Number(library.lat),
          Number(library.lng)
        )

        return { ...library, distanceInMeters }
      }).sort((a, b) => a.distanceInMeters - b.distanceInMeters) : libraries

      res.status(200).send({ data: { libraries: sortedLibraries }, error: null });
    } catch (error) {
      console.error(error);
      res.status(500).send({ data: null, error: { message: 'Internal server error' } });
    }
  }

  public static async getAllLibraryBooks(req: Request, res: Response): Promise<void> {
    const { libraryId } = req.params;


    try {
      if (req.query.category && typeof req.query.category == 'string')
        req.query.category = [Number(req.query.category) as any]
      else if (req.query.category && Array.isArray(req.query.category))
        req.query.category = req.query.category.map((category) => Number(category)) as any

      console.log(req.query.category)
      console.log(req.query.filter)

      const sort = {}

      let status = undefined

      if (req.query.filter) {
        switch (req.query.filter as string) {
          case Filter.LOWEST_PRICE_TO_HIGHEST.toString():
            sort['price'] = 'ASC'
            break
          case Filter.HIGHEST_PRICE_TO_LOWEST.toString():
            sort['price'] = 'DESC'
            break
          case Filter.TOP_SELLING.toString():
            sort['salesCount'] = 'DESC'
            break
          case Filter.NEW.toString():
            status = BookStatus.New
            break
          case Filter.USED.toString():
            status = BookStatus.Used
            break
        }
      }

      const books = await BookService.getAll({
        library: Number(libraryId),
        categories: req.query.category as any,
        search: req.query.search && req.query.search != 'null' ? req.query.search as string : null,
        status
      }, sort)

      if (req.query.filter == Filter.TOP_RATED.toString()) {
        books.sort((a, b) => Number(b.library?.totalRate || "0") - Number(a.library?.totalRate || "0"))
      }

      res.status(200).send({ data: { books }, error: null });
    } catch (error) {
      console.error(error);
      res.status(500).send({ data: null, error: { message: 'Internal server error' } });
    }
  }
}
