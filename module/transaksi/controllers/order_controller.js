import FormatResponse from "../../../helpers/response/responseHelper.js";
import Check from "../../../helpers/validation/check.js";
import orderService from "../services/order/index.js";

const create = async (req, res, next) => {
  try {
    const { id_meja, nama_customer } = req.body;
    let array = [
      {
        method: `number`,
        key: id_meja,
        variable_name: `id_meja`,
      },
      {
        method: `string`,
        key: nama_customer,
        variable_name: `nama customer`,
      },
    ];
    await Check.multiple_check_stringvar({ array });

    await orderService.createOrder({
      id_meja,
      nama_customer,
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

const kunci_order = async (req, res, next) => {
  try {
    const { id_order } = req.body;
    let array = [
      {
        method: `number`,
        key: id_order,
        variable_name: `order`,
      },
    ];
    await Check.multiple_check_stringvar({ array });
    const data = await orderService.kunciOrder({ id_order });
    req.body.responses = FormatResponse.successObject({
      data: data,
    });
  } catch (error) {
    next(error);
  }
  next();
};

const bayar_order = async (req, res, next) => {
  try {
    const { id_order } = req.body;
    let array = [
      {
        method: `number`,
        key: id_order,
        variable_name: `order`,
      },
    ];
    await Check.multiple_check_stringvar({ array });
    const data = await orderService.bayarOrder({ id_order });
    req.body.responses = FormatResponse.successObject({
      data: data,
    });
  } catch (error) {
    next(error);
  }
  next();
};

const tutup_order = async (req, res, next) => {
  try {
    const { id_order } = req.body;
    let array = [
      {
        method: `number`,
        key: id_order,
        variable_name: `order`,
      },
    ];
    await Check.multiple_check_stringvar({ array });
    const data = await orderService.tutupOrder({ id_order });
    req.body.responses = FormatResponse.successObject({
      data: data,
    });
  } catch (error) {
    next(error);
  }
  next();
};

export default { create, kunci_order, bayar_order, tutup_order };
