import {
  DataDuplicateError,
  DataNotFoundError,
} from "../../../../helpers/error/index.js";
import kategori from "../../models/kategori.model.js";
import product from "../../models/product.models.js";
import variant from "../../models/variant.model.js";

export const createProduct = async ({
  nama_product,
  id_variant,
  id_kategori,
  harga,
}) => {
  try {
    const [validate_variant, validate_kategori, validate_product] =
      await Promise.all([
        id_variant ? variant.findByPk(id_variant) : true,
        kategori.findByPk(id_kategori),
        product.findOne({
          where: { nama_product, id_variant, id_kategori, harga },
        }),
      ]);
    if (!validate_kategori) {
      throw new DataNotFoundError({
        message: "data kategori tidak ditemukan}",
      });
    } else if (!validate_variant) {
      throw new DataNotFoundError({
        message: "data variant tidak ditemukan}",
      });
    } else if (validate_product) {
      throw new DataDuplicateError({
        message:
          "data product dengan nama , variant , kategori , harga , yang sama sudah tersediah",
      });
    } else {
      const data = {
        nama_product,
        id_variant,
        id_kategori,
        harga,
      };
      await product.create(data);
    }
  } catch (error) {
    throw error;
  }
};
