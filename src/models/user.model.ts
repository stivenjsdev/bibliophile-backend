import bcrypt from "bcrypt";
import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../config/database";

export type UserAttributes = {
  id: number;
  name: string;
  phone: string;
  password: string;
  // createdAt?: Date;
  // updatedAt?: Date;
};

export type UserCreationAttributes = Optional<UserAttributes, "id">;

class User
  extends Model<UserAttributes, UserCreationAttributes>
  implements UserAttributes
{
  declare id: number;
  declare name: string;
  declare phone: string;
  declare password: string;

  // Timestamps
  declare readonly createdAt: Date;
  declare readonly updatedAt: Date;

  // Método para encriptar la contraseña antes de crear el usuario
  async hashPassword(): Promise<void> {
    this.password = await bcrypt.hash(this.password, 10);
  }

  // Método para validar la contraseña en el login
  async validatePassword(password: string): Promise<boolean> {
    return await bcrypt.compare(password, this.password);
  }
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "User",
    tableName: "users",
    timestamps: true,
    hooks: {
      beforeCreate: async (user: User) => {
        await user.hashPassword();
      },
    },
  }
);

export default User;
