import { DataDuplicateError } from "../../../../helpers/error/index.js";
import kategori from "./../../models/kategori.model.js";

export const createKategori = async ({ nama_kategori, keterangan }) => {
  try {
    const kategoriExist = await kategori.findOne({
      where: { nama_kategori },
    });
    if (kategoriExist) {
      throw new DataDuplicateError({
        statusCode: 400,
        message: "kategori already exist",
      });
    } else {
      let data = {
        nama_kategori,
        keterangan,
      };
      await kategori.create(data);
    }
  } catch (error) {
    throw error;
  }
};
