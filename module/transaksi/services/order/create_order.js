import { checkProductQuantities } from "./utility/validate_product_create_order.js";
import { validatePromos } from "./utility/validate_promo_create_product.js";
import product from "../../../master/models/product.models.js";
import order from "../../models/order.model.js";
import order_detail from "../../models/order_detail.js";
import meja from "../../../master/models/meja.model.js";

export const createOrder = async ({ order_item, order_promo, id_meja }) => {
  const transaction = await sequelize.transaction(); // Mulai transaksi

  try {
    const [productCheck, promoCheck, mejaCheck] = await Promise.all([
      checkProductQuantities(order_item, transaction),
      validatePromos(order_promo, order_item, transaction),
      meja.findByPk(id_meja),
    ]);

    // Simpan order
    const newOrder = await order.create(
      {
        totalAmount: order_item.reduce(
          (sum, item) => sum + product.get(item.id_product).price * item.qty,
          0
        ),
        id_meja,
      },
      { transaction }
    );

    // Simpan order detail
    await Promise.all(
      order_item.map(async (item) => {
        const { id_product, qty } = item;
        const productDetails = product.get(id_product);

        // Kurangi stok produk
        await product.update(
          {
            stock: productDetails.stock - qty,
          },
          {
            where: { id: id_product },
            transaction,
          }
        );

        // Simpan detail order
        await order_detail.create(
          {
            orderId: newOrder.id,
            productId: id_product,
            quantity: qty,
            price: productDetails.price,
          },
          { transaction }
        );
      })
    );

    // Simpan promo jika ada
    if (order_promo && order_promo.length > 0) {
      await Promise.all(
        order_promo.map((promoId) =>
          order_promo.create(
            {
              orderId: newOrder.id,
              promoId,
            },
            { transaction }
          )
        )
      );
    }

    // Commit transaksi
    await transaction.commit();
    req.body.responses = FormatResponse.successObject({
      data: newOrder,
      additionalData: null,
    });
  } catch (error) {
    // Rollback transaksi jika terjadi error
    await transaction.rollback();
    throw error;
  }
};
