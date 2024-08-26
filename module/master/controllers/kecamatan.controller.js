import FormatResponse from "../../../helpers/response/responseHelper.js";
import kecamatanService from "./../services/kecamatan/index.js";

const findAll = async (req, res, next) => {
  try {
    const { id_kota, limit } = req.query;
    const data = await kecamatanService.findResource({ id_kota, limit });
    req.body.responses = FormatResponse.successObject({
      data: data,
    });
    next();
  } catch (error) {
    next(error);
  }
};

export default { findAll };
