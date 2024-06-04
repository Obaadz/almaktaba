import type { Request, Response } from 'express';
import { RequestBookService } from '../services/request-book.service.js';

export class RequestBookController {
  public static async createRequestBook(req: Request, res: Response): Promise<void> {
    const { body } = req;
    try {
      console.log("T")
      console.log(req.file)
      console.log(body)

      const book = await RequestBookService.createOne(req.auth.user.id, body.title, body.author, body.description, req.file);

      res.status(200).send({ data: { book }, error: null });
    } catch (error) {
      console.error(error);
      res.status(500).send({ data: null, error: { message: 'Internal server error' } });
    }
  }
}
