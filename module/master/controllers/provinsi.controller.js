import FormatResponse from "../../../helpers/response/responseHelper.js";
import provinsiService from "../services/provinsi/index.js";

const findAll = async (req, res, next) => {
  try {
    const { search_key, limit } = req.query;
    const data = await provinsiService.findResource({ search_key, limit });
    req.body.responses = FormatResponse.successObject({
      data: data,
    });
    next();
  } catch (error) {
    next(error);
  }
};

export default { findAll };
