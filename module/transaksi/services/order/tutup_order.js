import { STATUS_MEJA } from "../../../../helpers/constants/constansStatusMeja.js";
import {
  STATUS_ORDER,
  STATUS_ORDER_TEXT,
} from "../../../../helpers/constants/constansStatusOrder.js";
import {
  DataNotFoundError,
  errorInFunction,
  ValidationError,
} from "../../../../helpers/error/index.js";
import meja from "../../../master/models/meja.model.js";
import order from "../../models/order.model.js";

export const tutupOrder = async ({ id_order, status = STATUS_ORDER.TUTUP }) => {
  try {
    const cek_status = await order.findByPk(id_order);
    if (!cek_status) {
      throw new DataNotFoundError({ message: "data order tidak ditemukan" });
    }

    if (cek_status.status !== STATUS_ORDER.DIBAYAR) {
      throw new ValidationError({
        message: `tidak bisa ngupdate status order ke tutup karena status order sekrang adalah ${
          STATUS_ORDER_TEXT[cek_status.status]
        }`,
      });
    }
    const [update_order, update_meja] = await Promise.all([
      order.update({ status }, { where: { id_order } }),
      meja.update(
        { status: STATUS_MEJA.TERSEDIA },
        { where: { id_meja: cek_status.id_meja } }
      ),
    ]);
    if (update_order[0] === 0 || update_meja[0] === 0) {
      throw new errorInFunction({
        message: "gagal mengupdate status meja dan order",
      });
    }
  } catch (error) {
    throw error;
  }
};
