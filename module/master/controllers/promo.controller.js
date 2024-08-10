import { TIPE_PROMO } from "../../../helpers/constants/constansTipePromo.js";
import ValidationError from "../../../helpers/error/validationErrorHelper.js";
import Check from "../../../helpers/validation/check.js";

import FormatResponse from "../../../helpers/response/responseHelper.js";
import promoService from "../services/promo/index.js";

const create = async (req, res, next) => {
  try {
    const { nama_promo, tipe, nilai } = req.body;

    let array = [
      {
        method: `string`,
        key: nama_promo,
        variable_name: `nama promo`,
      },
      {
        method: `string`,
        key: tipe,
        variable_name: `tipe promo`,
      },
      {
        method: `number`,
        key: nilai,
        variable_name: `nilai promo`,
      },
    ];
    await Check.multiple_check_stringvar({ array });
    if (!TIPE_PROMO.includes(tipe)) {
      throw new ValidationError({ message: "tipe promo tidak sesuai" });
    } else {
      await promoService.cratePromo({
        nama_promo,
        tipe,
        nilai,
      });
      req.body.responses = FormatResponse.successObject({
        data: null,
        additionalData: null,
      });
    }
  } catch (error) {
    next(error);
  }
  next();
};

export default {
  create,
};
