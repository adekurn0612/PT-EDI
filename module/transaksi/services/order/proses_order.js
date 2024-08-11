import { DB } from "../../../../config/database/connections";
import { STATUS_MEJA } from "../../../../helpers/constants/constansStatusMeja";
import {
  STATUS_ORDER,
  STATUS_ORDER_TEXT,
} from "../../../../helpers/constants/constansStatusOrder";
import {
  DataNotFoundError,
  ValidationError,
} from "../../../../helpers/error/index";
import order from "../../models/order.model";
import table from "../../models/table.model"; // Assuming you have a model for tables

const updateStatusOrder = async ({
  id_order,
  status = STATUS_ORDER.PROSES,
}) => {
  try {
    const cek_status = await order.findByPk(id_order);
    if (!cek_status) {
      throw new DataNotFoundError({ message: "data order tidak ditemukan" });
    }

    if (cek_status.status !== STATUS_ORDER.DRAFT) {
      throw new ValidationError({
        message: `tidak bisa ngupdate status order ke kunci karena status order sekrang adalah ${
          STATUS_ORDER_TEXT[cek_status.status]
        }`,
      });
    }
    await order.update({ status }, { where: { id_order } });
    return await DB.queryString(`select * from order_detail`);
  } catch (error) {
    throw error;
  }
};
