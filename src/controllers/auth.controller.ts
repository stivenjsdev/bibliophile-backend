import { Request, Response } from "express";
import { AuthService } from "../services/auth.service";

export class AuthController {
  static async register(req: Request, res: Response) {
    try {
      const { name, phone, password } = req.body;
      const user = await AuthService.register(name, phone, password);
      res.status(201).json({ message: "User registered successfully", user });
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ message: "Error registering user", error });
    }
  }

  static async login(req: Request, res: Response) {
    try {
      const { phone, password } = req.body;
      const user = await AuthService.validateUser(phone, password);
      if (!user) {
        res.status(401).json({ message: "Invalid credentials" });
        return;
      }

      const token = AuthService.generateToken(user.id);
      res.status(200).json({ token });
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ message: "Error logging in", error });
    }
  }
}
