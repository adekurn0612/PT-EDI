import { DB } from "../../../../config/database/connections.js";
import {
  DataNotFoundError,
  ValidationError,
} from "../../../../helpers/error/index.js";
import product from "../../../master/models/product.models.js";
import order_detail from "../../models/order_detail.js";
import { synncronHargaAfteCreate } from "./utility/syncron_harga_after_create.js";

export const createOrderDetail = async ({ id_order, id_product, qty }) => {
  const transaction = await DB.transaction();
  try {
    const cek_product = await product.findByPk(id_product);
    if (!cek_product) {
      throw new DataNotFoundError({ message: "data product tidak ditemukan" });
    }
    const harga_new = (+cek_product.harga || 0) * +qty;
    await order_detail.create(
      { id_order, id_product, qty, harga: harga_new },
      transaction
    );
    await synncronHargaAfteCreate({
      id_order,
      harga_create: harga_new,
      transaction,
    });
    await transaction.commit();
  } catch (error) {
    await transaction.rollback();
    throw error;
  }
};
