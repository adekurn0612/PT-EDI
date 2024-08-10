import Check from "../../../helpers/validation/check.js";
import kategori from "../services/kategori/index.js";

import FormatResponse from "./../../../helpers/response/responseHelper.js";

const create = async (req, res, next) => {
  try {
    const { nama_kategori, keterangan } = req.body;

    let array = [
      {
        method: `string`,
        key: nama_kategori,
        variable_name: `nama_kategori`,
      },
    ];
    await Check.multiple_check_stringvar({ array });

    await kategori.createKategori({
      nama_kategori,
      keterangan,
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
