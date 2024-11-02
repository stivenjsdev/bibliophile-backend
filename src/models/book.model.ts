import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../config/database";

export enum BookStatus {
  TO_READ = 1,
  READING = 2,
  READ = 3,
}

type BookAttributes = {
  id: number;
  title: string;
  author: string;
  status: BookStatus;
  rating?: number;
  genre: string;
};

type BookCreationAttributes = Optional<BookAttributes, "id">;

class Book extends Model<BookAttributes, BookCreationAttributes> {
  declare id: number;
  declare title: string;
  declare author: string;
  declare status: BookStatus;
  declare rating: number | null;
  declare genre: string;

  // Timestamps
  declare createdAt: Date;
  declare updatedAt: Date;
}

Book.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
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
  },
  {
    sequelize,
    modelName: "Book",
    tableName: "books",
    timestamps: true,
  }
);

export default Book;
