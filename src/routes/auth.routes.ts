import { Router } from "express";
import { body } from "express-validator";
import { AuthController } from "../controllers/auth.controller";
import { handleInputErrors } from "../middleware/validation.middleware";

const router = Router();

// registerUser
router.post(
  "/register",
  body("name").isString().notEmpty(),
  body("phone").isMobilePhone("any"), // any: valida cualquier tipo de teléfono
  body("password")
    .isString()
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),
  handleInputErrors,
  AuthController.register
);

// loginUser
router.post(
  "/login",
  body("phone").isMobilePhone("any"), // any: valida cualquier tipo de teléfono
  body("password").isString().notEmpty(),
  handleInputErrors,
  AuthController.login
);

export default router;
