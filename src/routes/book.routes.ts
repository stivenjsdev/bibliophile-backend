import { Router } from "express";
import { body, param, query } from "express-validator";
import { BookController } from "../controllers/book.controller";
import { handleInputErrors } from "../middleware/validation";
import { BookStatus } from "../models/book.model";

// /api/books
const router = Router();

// searchBooks
router.get(
  "/search",
  query("page").optional().isInt({ min: 1 }),
  query("limit").optional().isInt({ min: 1, max: 100 }),
  query("title").optional().isString(),
  query("author").optional().isString(),
  query("genre").optional().isString(),
  query("status")
    .optional()
    .isInt(),
  query("rating").optional().isInt({ min: 1, max: 5 }),
  handleInputErrors,
  BookController.searchBooks
);

// createBook
router.post(
  "/",
  body("title").isString().notEmpty(),
  body("author").isString().notEmpty(),
  body("status")
    .optional()
    // .isInt({ min: BookStatus.TO_READ, max: BookStatus.READ })
    .isInt()
    .custom((value) => Object.values(BookStatus).includes(value)),
  body("rating").optional().isInt({ min: 1, max: 5 }),
  body("genre").isString().notEmpty(),
  handleInputErrors,
  BookController.createBook
);

// updateBook
router.put(
  "/:id",
  param("id").isInt(),
  body("title").optional().isString().notEmpty(),
  body("author").optional().isString().notEmpty(),
  body("status")
    .optional()
    .isInt()
    .custom((value) => Object.values(BookStatus).includes(value)),
  body("rating").optional().isInt({ min: 1, max: 5 }),
  body("genre").optional().isString().notEmpty(),
  handleInputErrors,
  BookController.updateBook
);

// getAllBooks
router.get(
  "/",
  query("page").optional().isInt({ min: 1 }),
  query("limit").optional().isInt({ min: 1, max: 100 }),
  handleInputErrors,
  BookController.getAllBooks
);

// getBookById
router.get(
  "/:id",
  param("id").isInt(),
  handleInputErrors,
  BookController.getBookById
);

// deleteBook
router.delete(
  "/:id",
  param("id").isInt(),
  handleInputErrors,
  BookController.deleteBook
);

export default router;
