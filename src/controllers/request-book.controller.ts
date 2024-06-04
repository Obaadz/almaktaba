import type { Request, Response } from 'express';
import { RequestBookService } from '../services/request-book.service.js';

export class RequestBookController {
  public static async createRequestBook(req: Request, res: Response): Promise<void> {
    const { body } = req;
    try {
      console.log(body)

      req.body.image = new Uint8Array(req.body.image as Uint8Array);

      const buffer = Buffer.from(req.body.image);

      const file = {
        buffer,
        originalname: Date.now() + '.png',
        mimetype: 'image/png',
        fieldname: 'image'
      }


      const book = await RequestBookService.createOne(req.auth.user.id, body.title, body.author, body.description, file);

      res.status(200).send({ data: { book }, error: null });
    } catch (error) {
      console.error(error);
      res.status(500).send({ data: null, error: { message: 'Internal server error' } });
    }
  }
}
