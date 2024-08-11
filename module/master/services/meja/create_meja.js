import { DataDuplicateError } from "../../../../helpers/error/index.js";
import kategori_station_printer from "../../models/kategori_station_printer.js";
import meja from "./../../models/meja.model.js";

export const createMeja = async ({ nama_meja, keterangan, status }) => {
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
        status,
      };
      await meja.create(data);
    }
  } catch (error) {
    throw error;
  }
};
