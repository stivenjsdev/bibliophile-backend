import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../config/database";
import User from "./user.model";

export enum BookStatus {
  TO_READ = 0,
  READING = 1,
  READ = 2,
}

export type BookAttributes = {
  id: number;
  title: string;
  author: string;
  status: BookStatus;
  rating?: number;
  genre: string;
  user_id: number; // Relational attribute
};

export type BookCreationAttributes = Optional<BookAttributes, "id">;

class Book
  extends Model<BookAttributes, BookCreationAttributes>
  implements BookAttributes
{
  declare id: number;
  declare title: string;
  declare author: string;
  declare status: BookStatus;
  declare rating: number | null;
  declare genre: string;

  declare user_id: number; // Relational attribute

  // Timestamps
  declare readonly createdAt: Date;
  declare readonly updatedAt: Date;
}

Book.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    title: { type: DataTypes.STRING, allowNull: false },
    author: { type: DataTypes.STRING, allowNull: false },
    status: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: BookStatus.TO_READ,
      validate: {
        isIn: {
          args: [Object.values(BookStatus)],
          msg: "Invalid status, it must be 1 (TO_READ), 2 (READING) or 3 (READ)",
        },
      },
    },
    rating: {
      type: DataTypes.INTEGER,
      allowNull: true,
      validate: { min: 1, max: 5, isInt: true },
    },
    genre: { type: DataTypes.STRING, allowNull: false },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User,
        key: "id",
      },
    },
  },
  {
    sequelize,
    modelName: "Book",
    tableName: "books",
    timestamps: true,
  }
);

// Definimos la relación entre Book y User
Book.belongsTo(User, { foreignKey: "user_id", as: "user" });
User.hasMany(Book, { foreignKey: "user_id", as: "books" });

export default Book;
