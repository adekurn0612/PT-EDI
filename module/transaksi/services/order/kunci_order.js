import { DB } from "../../../../config/database/connections.js";
import { STATUS_ORDER } from "../../../../helpers/constants/constansStatusOrder.js";
import {
  DataNotFoundError,
  errorInFunction,
} from "../../../../helpers/error/index.js";
import order from "../../models/order.model.js";

export const kunciOrder = async ({ id_order }) => {
  try {
    // Await the findByPk method
    const cek_data = await order.findByPk(id_order);
    if (!cek_data) {
      throw new DataNotFoundError({ message: "Data order tidak ditemukan" });
    }

    const [update, list_product, list_promo, total] = await Promise.all([
      order.update({ status: STATUS_ORDER.KUNCI }, { where: { id_order } }),
      DB.queryString(
        `
				SELECT 
					p.nama_product AS nama,
					od.qty AS jumlah,
					od.harga
				FROM transaksi.order_detail od
				JOIN master.ms_product p ON p.id_product = od.id_product
				WHERE od.id_promo IS NULL AND od.id_order = ${id_order}`
      ),
      DB.queryString(
        `
				SELECT 
					pr.nama_promo AS nama,
					od.qty AS jumlah,
					od.harga
				FROM transaksi.order_detail od
				JOIN master.ms_promo pr ON pr.id_promo = od.id_promo
				WHERE od.id_product IS NULL AND od.id_order = ${id_order}`
      ),
      DB.queryString(
        `
				SELECT total_harga 
				FROM transaksi.order 
				WHERE id_order = ${id_order}`
      ),
    ]);

    const total_harga = total.length > 0 ? total[0].total_harga : 0;
    if (update[0] === 0) {
      throw new errorInFunction({ message: "status order gagal di update" });
    }
    const data = {
      product: list_product,
      promo: list_promo,
      total_harga: total_harga,
    };

    return data;
  } catch (error) {
    throw error;
  }
};
