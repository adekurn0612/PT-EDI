import { DataDuplicateError } from "../../../../helpers/error/index.js";
import meja from "./../../models/meja.model.js";

export const createMeja = async ({ nama_meja, keterangan }) => {
  try {
    const mejaExist = await meja.findOne({
      where: { nama_meja },
    });
    if (mejaExist) {
      throw new DataDuplicateError({
        statusCode: 400,
        message: "meja  already exist",
      });
    } else {
      let data = {
        nama_meja,
        keterangan,
      };
      await meja.create(data);
    }
  } catch (error) {
    throw error;
  }
};
