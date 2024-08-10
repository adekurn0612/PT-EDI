import { DataDuplicateError } from "../../../../helpers/error/index.js";
import promo from "../../models/promo.model.js";

export const cratePromo = async ({ nama_promo, tipe, nilai }) => {
  try {
    const cek_data = await promo.findOne({
      where: { nama_promo, tipe, nilai },
    });
    if (cek_data) {
      throw new DataDuplicateError({ message: "Data promo sudah tersediah" });
    } else {
      const data = {
        nama_promo,
        tipe,
        nilai,
      };
      await promo.create(data);
    }
  } catch (error) {
    throw error;
  }
};
