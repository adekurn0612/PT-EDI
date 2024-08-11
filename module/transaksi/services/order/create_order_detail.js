import { checkProductQuantities } from "./utility/validate_product_create_order.js";
import { validatePromos } from "./utility/validate_promo_create_product.js";
import product from "../../../master/models/product.models.js";
import order from "../../models/order.model.js";
import order_detail from "../../models/order_detail.js";
import meja from "../../../master/models/meja.model.js";
import DataNotFoundError from "../../../../helpers/error/dataNotFoundErrorHelper.js";
import { STATUS_ORDER_TEXT } from "../../../../helpers/constants/constansStatusOrder.js";
import promo from "../../../master/models/promo.model.js";
import DB from "../../../config/database.js"; // Ensure correct DB import

export const createOrderDetail = async ({
  id_order,
  id_product,
  id_promo,
  qty,
}) => {
  const transaction = await DB.transaction();
  try {
    const [cek_order, cek_product, cek_promo] = await Promise.all([
      order.findByPk(id_order),
      id_product ? product.findByPk(id_product) : null,
      id_promo ? promo.findByPk(id_promo) : null,
    ]);

    if (!cek_order) {
      throw new DataNotFoundError({ message: "data order tidak ditemukan" });
    } else if (cek_order.status !== STATUS_ORDER.DRAFT) {
      throw new DataNotFoundError({
        message: `tidak bisa menambahkan order pada item ini karena status order adalah ${STATUS_ORDER_TEXT(
          cek_order.status
        )}`,
      });
    }

    if (id_product && !cek_product) {
      throw new DataNotFoundError({ message: "data product tidak ditemukan" });
    } else if (id_promo && !cek_promo) {
      throw new DataNotFoundError({ message: "data promo tidak ditemukan" });
    }

    let price_order = 0;
    if (id_product && cek_product) {
      price_order = cek_product.price * qty;
    } else if (id_promo && cek_promo) {
      price_order = cek_promo.price * qty;
    }

    const data = {
      id_order,
      id_product,
      id_promo,
      qty,
      price: price_order,
    };
    await order_detail.create(data, { transaction });
    const total_harga = cek_order.price + price_order;

    await order.update(
      { price: total_harga },
      { where: { id: id_order }, transaction }
    );

    await transaction.commit();
  } catch (error) {
    await transaction.rollback();
    console.error("Error creating order detail:", error);
    throw error;
  }
};
