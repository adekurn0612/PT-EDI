import { DataDuplicateError } from "../../../../helpers/error/index.js";
import station_printer from "../../models/station_printer.model.js";

export const createStationPrinter = async ({
  nama_station_printer,
  keterangan,
}) => {
  try {
    const stationPrinterExist = await station_printer.findOne({
      where: { nama_station_printer },
    });
    if (stationPrinterExist) {
      throw new DataDuplicateError({
        statusCode: 400,
        message: "station printer  already exist",
      });
    } else {
      let data = {
        nama_station_printer,
        keterangan,
      };
      await station_printer.create(data);
    }
  } catch (error) {
    throw error;
  }
};
