import { RequestBook } from '../entities/request-book.entity.js';
import fs from 'fs'
import { UserService } from './user.service.js';

export class RequestBookService {
  public static async createOne(userId: number, title: string, author: string, description: string, image: {
    buffer: Buffer,
    originalname: string,
    mimetype: string,
    size: number,
    fieldname: string
  }
  ): Promise<RequestBook> {
    const newBook = new RequestBook()

    const user = await UserService.getUserById(userId)

    newBook.user = user
    newBook.title = title
    newBook.author = author
    newBook.description = description
    newBook.key = image?.fieldname + '-' + Date.now() + '-' + image?.originalname
    newBook.bucket = 'public/files2'
    newBook.mime = image?.mimetype

    // buffer to file2
    fs.writeFileSync(`public/files2/${newBook.key}`, image?.buffer)

    await newBook.save()

    return newBook
  }
}
