import { STATUS_MEJA } from "../../../helpers/constants/constansStatusMeja.js";
import ValidationError from "../../../helpers/error/validationErrorHelper.js";
import Check from "../../../helpers/validation/check.js";
import serviceMeja from "../services/meja/index.js";
import FormatResponse from "./../../../helpers/response/responseHelper.js";

const create = async (req, res, next) => {
  try {
    const { nama_meja, keterangan, status } = req.body;

    let array = [
      {
        method: `string`,
        key: nama_meja,
        variable_name: `nama_meja`,
      },
    ];
    await Check.multiple_check_stringvar({ array });
    if (!Object.values(STATUS_MEJA).includes(status)) {
      throw new ValidationError({ message: "status meja tidak sesuai" });
    }
    await serviceMeja.createMeja({
      nama_meja,
      keterangan,
      status,
    });
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
