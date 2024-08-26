import DataDuplicateError from "../../../../helpers/error/dataDuplicateErrorHelper.js";
import { users } from "../../models/user.models.js";
import bcrypt from "bcrypt";

export const createUser = async ({ email, nama_lengkap, password, role }) => {
  try {
    const usersExist = await users.findOne({ where: { email } });
    if (usersExist) {
      throw new DataDuplicateError({
        statusCode: 400,
        message: "Email sudah digunakan",
      });
    } else {
      const passwordEncrypt = await bcrypt.hash(password, 10);
      let data = {
        email,
        password: passwordEncrypt,
        nama_lengkap,
        role,
      };
      await users.create(data);
    }
  } catch (error) {
    throw error;
  }
};
