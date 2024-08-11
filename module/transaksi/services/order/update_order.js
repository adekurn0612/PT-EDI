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

const updateStatusOrder = async ({ id_order, status }) => {
  try {
    const cek_status = await order.findByPk(id_order);
    if (!cek_status) {
      throw new DataNotFoundError({ message: "data order tidak ditemukan" });
    }

    if (
      status === STATUS_ORDER.DRAFT &&
      cek_status.status !== STATUS_ORDER.KUNCI
    ) {
      throw new ValidationError({
        message: `tidak bisa ngupdate status order ke draft karena status order sekrang adalah ${
          STATUS_ORDER_TEXT[cek_status.status]
        }`,
      });
    } else if (
      status === STATUS_ORDER.KUNCI &&
      cek_status.status !== STATUS_ORDER.DRAFT
    ) {
      throw new ValidationError({
        message: `tidak bisa ngupdate status order ke kunci karena status order sekrang adalah ${
          STATUS_ORDER_TEXT[cek_status.status]
        }`,
      });
    } else if (
      status === STATUS_ORDER.PROSES &&
      cek_status.status !== STATUS_ORDER.KUNCI
    ) {
      throw new ValidationError({
        message: `tidak bisa ngupdate status order ke proses karena status order sekrang adalah ${
          STATUS_ORDER_TEXT[cek_status.status]
        }`,
      });
    } else if (
      status === STATUS_ORDER.TUTUP &&
      cek_status.status !== STATUS_ORDER.PROSES
    ) {
      throw new ValidationError({
        message: `tidak bisa ngupdate status order ke tutup karena status order sekrang adalah ${
          STATUS_ORDER_TEXT[cek_status.status]
        }`,
      });
    }

    cek_status.status = status;
    await cek_status.save();

    if (status === STATUS_ORDER.TUTUP) {
      const tableToUpdate = await table.findOne({ where: { id_order } });
      if (tableToUpdate) {
        tableToUpdate.status = STATUS_MEJA.AVAILABLE;
        await tableToUpdate.save();
      }
    }

    if (status === STATUS_ORDER.PROSES) {
      const orderDetails = await order.findByPk(id_order, {
        include: [],
      });
      return orderDetails;
    }
  } catch (error) {
    throw error;
  }
};
