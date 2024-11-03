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

  static async getAllBooks(
    { limit, offset }: PaginationParams,
    userId: BookCreationAttributes["user_id"]
  ): Promise<{ books: Book[]; total: number }> {
    const { rows: books, count: total } = await Book.findAndCountAll({
      where: { user_id: userId },
      limit,
      offset,
      order: [["createdAt", "DESC"]],
    });

    return {
      books,
      total,
    };
  }

  static async getBookById(
    id: number,
    userId: BookCreationAttributes["user_id"]
  ): Promise<Book | null> {
    return await Book.findOne({ where: { id, user_id: userId } });
  }

  static async updateBook(
    id: number,
    data: Partial<BookCreationAttributes>,
    userId: BookCreationAttributes["user_id"]
  ): Promise<Book | null> {
    const book = await Book.findOne({ where: { id, user_id: userId } });
    if (!book) return null;

    await book.update(data);
    return book;
  }

  static async deleteBook(
    id: number,
    userId: BookCreationAttributes["user_id"]
  ): Promise<boolean> {
    const book = await Book.findOne({ where: { id, user_id: userId } });
    if (book) {
      await book.destroy();
      return true;
    }
    return false;
  }

  static async searchBooks(
    filters: BookFilters,
    pagination: PaginationParams,
    userId: BookCreationAttributes["user_id"]
  ) {
    const { limit, offset } = pagination;
    const { title, author, genre, status, rating } = filters;

    // Construimos la consulta de filtrado con los parámetros opcionales
    const where: any = { user_id: userId };

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
