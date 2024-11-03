import jwt from "jsonwebtoken";
import { config } from "../config/config";
import User from "../models/user.model";

export class AuthService {
  // Método para registrar un nuevo usuario (no necesita encriptar la contraseña)
  static async register(name: string, phone: string, password: string) {
    return User.create({ name, phone, password });
  }

  // Método para validar credenciales de usuario
  static async validateUser(phone: string, password: string) {
    const user = await User.findOne({ where: { phone } });
    if (user && (await user.validatePassword(password))) {
      // Utiliza validatePassword del modelo User
      return user;
    }
    return null;
  }

  // Método para generar un token JWT
  static generateToken(userId: number): string {
    const payload = { userId };
    return jwt.sign(payload, config.JWT_SECRET, {
      expiresIn: "1h",
    }); // todo: change expiresIn to the desired value
  }
}
