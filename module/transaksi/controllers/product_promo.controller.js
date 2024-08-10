import FormatResponse from "../../../helpers/response/responseHelper.js";
import Check from "../../../helpers/validation/check.js";
import productPromoService from "../services/product_promo/index.js";

const create = async (req, res, next) => {
  try {
    const { id_promo, id_product } = req.body;
    let array = [
      {
        method: `number`,
        key: id_promo,
        variable_name: `promo`,
      },
      {
        method: `number`,
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
