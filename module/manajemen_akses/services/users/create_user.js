import DataDuplicateError from "../../../../helpers/error/dataDuplicateErrorHelper.js";
import { users } from "../../models/user.models.js";
import bcrypt from "bcrypt";

export const createUser = async ({ username, nama_lengkap, password }) => {
  try {
    const usersExist = await users.findOne({ where: { username } });
    if (usersExist) {
      throw new DataDuplicateError({
        statusCode: 400,
        message: "User already exist",
      });
    } else {
      const passwordEncrypt = await bcrypt.hash(password, 10);
      let data = {
        username,
        password: passwordEncrypt,
        nama_lengkap,
      };
      await users.create(data);
    }
  } catch (error) {
    throw error;
  }
};
