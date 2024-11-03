import { Op } from "sequelize";
import Book, { BookCreationAttributes } from "../models/book.model";

type PaginationParams = {
  limit: number;
  offset: number;
};

export type BookFilters = {
  title?: string;
  author?: string;
  genre?: string;
  status?: number;
  rating?: number;
};

export class BookService {
  static async createBook(data: BookCreationAttributes): Promise<Book> {
    return await Book.create(data);
  }

  static async getAllBooks({
    limit,
    offset,
  }: PaginationParams): Promise<{ books: Book[]; total: number }> {
    const { rows: books, count: total } = await Book.findAndCountAll({
      limit,
      offset,
      order: [["createdAt", "DESC"]], // Opcional: Ordenar por fecha de creación (del más reciente al más antiguo)
    });

    return {
      books: books,
      total: total,
    };
  }

  static async getBookById(id: number): Promise<Book | null> {
    return await Book.findByPk(id);
  }

  static async updateBook(
    id: number,
    data: Partial<BookCreationAttributes>
  ): Promise<Book | null> {
    const book = await Book.findByPk(id);
    if (!book) return null;

    await book.update(data);
    return book;
  }

  static async deleteBook(id: number) {
    const book = await Book.findByPk(id);
    if (book) {
      await book.destroy();
      return true;
    }
    return false;
  }

  static async searchBooks(filters: BookFilters, pagination: PaginationParams) {
    const { limit, offset } = pagination;
    const { title, author, genre, status, rating } = filters;

    // Construimos la consulta de filtrado con los parámetros opcionales
    const where: any = {};

    if (title) where.title = { [Op.iLike]: `%${title}%` };
    if (author) where.author = { [Op.iLike]: `%${author}%` };
    if (genre) where.genre = { [Op.iLike]: `%${genre}%` };
    if (status !== undefined) where.status = status;
    if (rating) where.rating = rating;

    const { rows: books, count: total } = await Book.findAndCountAll({
      where,
      limit,
      offset,
      order: [["createdAt", "DESC"]], // Opcional: Ordenar por fecha de creación (del más reciente al más antiguo)
    });

    return {
      books,
      total,
    };
  }
}
