import { Router } from "express";
import { body, param } from "express-validator";
import { BookController } from "../controllers/book.controller";
import { BookStatus } from "../models/book.model";

const router = Router();

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
  BookController.updateBook
);

// getAllBooks
router.get("/", BookController.getAllBooks);

// getBookById
router.get("/:id", param("id").isInt(), BookController.getBookById);

// deleteBook
router.delete("/:id", param("id").isInt(), BookController.deleteBook);

export default router;
