import { DataDuplicateError } from "../../../../helpers/error/index.js";
import variant from "../../models/variant.model.js";

export const createVariant = async ({ nama_variant, keterangan }) => {
  try {
    const variantExist = await variant.findOne({ where: { nama_variant } });
    if (variantExist) {
      throw new DataDuplicateError({
        statusCode: 400,
        message: "variant already exist",
      });
    } else {
      let data = {
        nama_variant,
        keterangan,
      };
      await variant.create(data);
    }
  } catch (error) {
    throw error;
  }
};
