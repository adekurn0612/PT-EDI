import { ValidationError } from "../../../helpers/error/index.js";
import FormatResponse from "../../../helpers/response/responseHelper.js";
import Check from "../../../helpers/validation/check.js";
import {
  createOrderDetail,
  createOrderDetailPromo,
} from "../services/order_detail/index.js";

const create = async (req, res, next) => {
  try {
    const { id_order, id_product, id_promo, qty } = req.body;
    let array = [
      {
        method: `number`,
        key: qty,
        variable_name: `quantity`,
      },
      {
        method: `number`,
        key: id_order,
        variable_name: `order`,
      },
    ];
    await Check.multiple_check_stringvar({ array });

    if (!id_product && !id_promo) {
      throw new ValidationError({ message: "silahkan masukan product/paket" });
    }

    if (id_product) {
      await createOrderDetail({ id_order, id_product, qty });
    } else if (id_promo) {
      await createOrderDetailPromo({ id_order, id_promo, qty });
    }
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
