import { IsNull, Like, In } from 'typeorm';
import { Book } from '../entities/book.entity.js';

export class BookService {
  public static async getAll(query: { library: number | null, categories?: number[] | null, search?: string }, order?: {
    salesCount?: 'ASC' | 'DESC',
    price?: 'ASC' | 'DESC',
    library?: {
      totalRate: 'ASC' | 'DESC'
    }
    user?: {
      totalRate: 'ASC' | 'DESC'
    }
  }): Promise<Book[]> {
    const where = query.search ? [
      {
        library: !query.library ? IsNull() : { id: query.library },
        category: !query.categories ? undefined : In(query.categories),
        title: Like(`%${query.search}%`),
      },
      {
        library: !query.library ? IsNull() : { id: query.library },
        category: !query.categories ? undefined : In(query.categories),
        author: Like(`%${query.search}%`)
      }
    ] : [
      {
        library: !query.library ? IsNull() : { id: query.library },
        category: !query.categories ? undefined : In(query.categories),
      }
    ]

    return Book.find({
      where,
      order
    })
  }

  public static async getOneById(id: number): Promise<Book | undefined> {
    return Book.findOneBy({ id })
  }
}
