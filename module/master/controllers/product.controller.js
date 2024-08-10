import Check from "../../../helpers/validation/check.js";
import productService from "../services/product/index.js";
import FormatResponse from "./../../../helpers/response/responseHelper.js";

const create = async (req, res, next) => {
  try {
    const { nama_product, id_variant, id_kategori, harga } = req.body;

    let array = [
      {
        method: `string`,
        key: nama_product,
        variable_name: `nama_product`,
      },
      {
        method: `number`,
        key: id_kategori,
        variable_name: `kategori`,
      },
      {
        method: `number`,
        key: id_variant,
        variable_name: `variant`,
      },
      {
        method: `number`,
        key: harga,
        variable_name: `harga`,
      },
    ];
    await Check.multiple_check_stringvar({ array });

    await productService.createProduct({
      nama_product,
      id_variant,
      id_kategori,
      harga,
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
