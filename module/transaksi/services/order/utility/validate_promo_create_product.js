import { DataNotFoundError } from "../../../../../helpers/error/index.js";
import promo from "../../../../master/models/promo.model.js";

export const validatePromos = async (order_promo, order_item, transaction) => {
  try {
    if (!order_promo || order_promo.length === 0) {
      return;
    }
    const promos = await promo.findAll({
      where: {
        id: {
          [Op.in]: order_promo,
        },
      },
      transaction,
    });

    const promoMap = new Map(promos.map((p) => [p.id, p]));
    const invalidPromos = order_promo.filter((promoId) => {
      const promoDetails = promoMap.get(promoId);
      if (!promoDetails) return true;
      const applicableItems = order_item.filter((item) =>
        promoDetails.applicableProducts.includes(item.id_product)
      );
      const totalQty = applicableItems.reduce((sum, item) => sum + item.qty, 0);

      return totalQty < promoDetails.minQty;
    });

    if (invalidPromos.length > 0) {
      throw new DataNotFoundError({
        message: `Promo tidak valid untuk ID berikut: ${JSON.stringify(
          invalidPromos
        )}`,
      });
    }

    return;
  } catch (error) {
    throw error;
  }
};
