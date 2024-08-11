import { DB } from "../../../../config/database/connections.js";
import { TIPE_PROMO } from "../../../../helpers/constants/constansTipePromo.js";
import { ValidationError } from "../../../../helpers/error/index.js";
import promo from "../../../master/models/promo.model.js";
import order_detail from "../../models/order_detail.js";
import { synncronHargaAfteCreate } from "./utility/syncron_harga_after_create.js";

export const createOrderDetailPromo = async ({ id_order, id_promo, qty }) => {
  const transaction = await DB.transaction();
  try {
    const cek_promo = await promo.findByPk(id_promo);
    if (!cek_promo) {
      throw new ValidationError({ message: "data promo tidak ditemukan" });
    }
    const harga_promo = +qty * (+cek_promo.nilai || 0);
    const data = { id_order, id_promo, qty, harga: harga_promo };
    await order_detail.create(data, transaction);
    await synncronHargaAfteCreate({
      id_order,
      harga_create: harga_promo,
      transaction,
    });
  } catch (error) {
    throw error;
  }
};
