import { DataNotFoundError } from "../../../../../helpers/error/index.js";
import product from "../../../../master/models/product.models.js";

export const checkProductQuantities = async (order_item, transaction) => {
  try {
    const productIds = order_item.map((item) => item.id_product);

    const products = await product.findAll({
      where: {
        id: {
          [Op.in]: productIds,
        },
      },
      lock: transaction.LOCK.UPDATE,
      transaction,
    });

    const productMap = new Map(products.map((p) => [p.id, p]));

    const insufficientItems = order_item.filter((item) => {
      const { id_product, qty } = item;
      const productDetails = productMap.get(id_product);
      return !productDetails || productDetails.stock < qty;
    });

    if (insufficientItems.length > 0) {
      throw new DataNotFoundError({
        message: `Kuantitas tidak mencukupi untuk produk berikut: ${JSON.stringify(
          insufficientItems
        )}`,
      });
    }

    return;
  } catch (error) {
    throw error;
  }
};
