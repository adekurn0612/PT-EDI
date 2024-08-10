import Check from "../../../helpers/validation/check.js";
import station_printer from "../services/station_printer/index.js";
import FormatResponse from "./../../../helpers/response/responseHelper.js";

const create = async (req, res, next) => {
  try {
    const { nama_station_printer, keterangan } = req.body;

    let array = [
      {
        method: `string`,
        key: nama_station_printer,
        variable_name: `nama_station_printer`,
      },
    ];
    await Check.multiple_check_stringvar({ array });

    await station_printer.createStationPrinter({
      nama_station_printer,
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
