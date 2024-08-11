import { DB } from "../../../../../config/database/connections.js";
import order from "../../../models/order.model.js";

export const synncronHargaAfteCreate = async ({
  id_order,
  harga_create,
  transaction,
}) => {
  try {
    const harga_old = await DB.queryString(
      `SELECT COALESCE(SUM(harga), 0) AS harga_old
		FROM transaksi.order_detail
		WHERE "deletedAt" IS NULL
		and id_order = ${id_order}`
    );

    const harga_new = +(harga_old[0].harga_old || 0) + +harga_create;

    await order.update(
      { total_harga: harga_new },
      { where: { id_order }, transaction }
    );
  } catch (error) {
    throw error;
  }
};
