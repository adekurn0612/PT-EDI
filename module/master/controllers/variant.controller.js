import Check from "../../../helpers/validation/check.js";
import variant from "../services/variant/index.js";
import FormatResponse from "./../../../helpers/response/responseHelper.js";

const create = async (req, res, next) => {
  try {
    const { nama_variant, keterangan } = req.body;

    let array = [
      { method: `string`, key: nama_variant, variable_name: `nama_variant` },
    ];
    await Check.multiple_check_stringvar({ array });

    await variant.createVariant({ nama_variant, keterangan });
    req.body.responses = FormatResponse.successObject({
      data: null,
      additionalData: null,
    });
  } catch (error) {
    next(error);
  }
  next();
};

export default {
  create,
};
