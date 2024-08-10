import FormatResponse from "../../../helpers/response/responseHelper.js";
import Check from "../../../helpers/validation/check.js";
import orderService from "../services/order/index.js";

const create = async (req, res, next) => {
  try {
    const { order_item, order_promo, id_meja } = req.body;
    let array = [
      {
        method: `number`,
        key: order_item,
        variable_name: `promo`,
      },
      {
        method: `order_promo`,
        key: id_product,
        variable_name: `product`,
      },
    ];
    await Check.multiple_check_stringvar({ array });

    await productPromoService.createProductPromo({ id_product, id_promo });
    req.body.responses = FormatResponse.successObject({
      data: null,
      additionalData: null,
    });
  } catch (error) {
    next(error);
  }
  next();
};

export default { create };
