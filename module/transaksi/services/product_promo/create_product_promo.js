import { where } from "sequelize";
import product from "./../../../master/models/product.models.js";
import promo from "./../../../master/models/promo.model.js";
import { DataNotFoundError } from "../../../../helpers/error/index.js";
import product_promo from "./../../models/product_promo.js";

export const createProductPromo = async ({ id_product, id_promo }) => {
  try {
    const [cek_product, cek_promo] = await Promise.all([
      product.findOne({ where: { id_product } }),
      promo.findOne({ where: { id_promo } }),
    ]);
    if (!cek_promo) {
      throw new DataNotFoundError({ message: "data promo tidak ditemukan" });
    } else if (!cek_product) {
      throw new DataNotFoundError({ message: "data product tidak ditemukan" });
    } else {
      const data = {
        id_product,
        id_promo,
      };
      product_promo.create(data);
    }
  } catch (error) {
    throw error;
  }
};
