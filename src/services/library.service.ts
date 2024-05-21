import { Library } from '../entities/library.entity.js';

export class LibraryService {
  public static async getAll(): Promise<Library[]> {
    return Library.find()
  }

  public static async getLibraryById(id: number): Promise<Library> {
    return Library.findOneBy({ id })
  }

}
