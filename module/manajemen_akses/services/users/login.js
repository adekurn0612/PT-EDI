import { DataNotFoundError } from "../../../../helpers/error/index.js";
import Jwt from "../../../../helpers/jwt/jwt.js";
import { users } from "../../models/user.models.js";
import bcrypt from "bcrypt";

export const loginUser = async ({ email, password }) => {
  try {
    const data = await users.findOne({ where: { email } });
    if (!data) {
      throw new DataNotFoundError({ message: "user tidak diitemukan" });
    }
    let hashedPassword = data.password;
    let passwordMatch = await bcrypt.compare(password, hashedPassword);
    if (passwordMatch) {
      const user_object = {
        email,
        role: data.role,
        id_user: data.id_user,
      };
      const result = await Jwt.generateToken({ data: user_object });
      return result;
    } else {
      throw new DataNotFoundError({ message: "password salah" });
    }
  } catch (error) {
    throw error;
  }
};
