import order from "../../models/order.model.js";
import order_detail from "../../models/order_detail.js";
import meja from "../../../master/models/meja.model.js";
import DataNotFoundError from "../../../../helpers/error/dataNotFoundErrorHelper.js";
import {
  STATUS_MEJA,
  STATUS_MEJA_TEXT,
} from "../../../../helpers/constants/constansStatusMeja.js";
import { STATUS_ORDER } from "../../../../helpers/constants/constansStatusOrder.js";

export const createOrder = async ({
  nama_customer,
  id_meja,
  status = STATUS_ORDER.DRAFT,
}) => {
  try {
    const cek_meja = await meja.findByPk(id_meja);

    if (!cek_meja) {
      throw new DataNotFoundError({ message: "data meja tidak ditemukan" });
    } else if (cek_meja.status !== STATUS_MEJA.TERSEDIA) {
      throw new DataNotFoundError({
        message: `tidak bisa melakukan order di meja ini karena meja ini sudah ${
          STATUS_MEJA_TEXT[cek_meja.status]
        }`,
      });
    } else {
      const data = {
        nama_customer,
        id_meja,
        status,
      };
      await order.create(data);
    }
  } catch (error) {
    console.error("Error creating order:", error);
    throw error;
  }
};
