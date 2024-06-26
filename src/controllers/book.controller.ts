import type { Request, Response } from 'express';
import { BookService } from '../services/book.service.js';
import { BookStatus, Filter } from '../utils/enums.js';

export class BookController {
  public static async getAllBooksWithNoLibrary(req: Request, res: Response): Promise<void> {
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
        library: null,
        categories: req.query.category as any,
        search: req.query.search && req.query.search != 'null' ? req.query.search as string : null,
        status
      }, sort)

      if (req.query.filter)
        switch (req.query.filter as string) {
          case Filter.TOP_RATED.toString():
            books.sort((a, b) => parseFloat(b.seller?.totalRate || "0") - parseFloat(a.seller?.totalRate || "0"))
            break
          case Filter.LOWEST_PRICE_TO_HIGHEST.toString():
            books.sort((a, b) => parseFloat(a.price) - parseFloat(b.price))
            break
          case Filter.HIGHEST_PRICE_TO_LOWEST.toString():
            books.sort((a, b) => parseFloat(b.price) - parseFloat(a.price))
            break
        }

      res.status(200).send({ data: { books }, error: null });
    } catch (error) {
      console.error(error);
      res.status(500).send({ data: null, error: { message: 'Internal server error' } });
    }
  }
}
