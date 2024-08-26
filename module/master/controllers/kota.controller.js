import kotaService from "./../services/kota/index.js";
import FormatResponse from "../../../helpers/response/responseHelper.js";

const findAll = async (req, res, next) => {
  try {
    const { id_provinsi, limit } = req.query;
    const data = await kotaService.findResource({ id_provinsi, limit });
    req.body.responses = FormatResponse.successObject({
      data: data,
    });
    next();
  } catch (error) {
    next(error);
  }
};

export default { findAll };
