import kelurahanService from "./../services/kelurahan/index.js";
import FormatResponse from "../../../helpers/response/responseHelper.js";

const findAll = async (req, res, next) => {
  try {
    const { id_kecamatan, limit } = req.query;
    const data = await kelurahanService.findResource({ id_kecamatan, limit });
    req.body.responses = FormatResponse.successObject({
      data: data,
    });
    next();
  } catch (error) {
    next(error);
  }
};

export default { findAll };
