import Check from "../../../helpers/validation/check.js";
import jobOpeningService from "../services/job_opening/index.js";
import FormatResponse from "./../../../helpers/response/responseHelper.js";

const create = async (req, res, next) => {
  try {
    const { nama_job, status = true } = req.body;

    let array = [
      { method: `string`, key: nama_job, variable_name: `nama job` },
    ];
    await Check.multiple_check_stringvar({ array });

    // await userServices.createUser({ email, nama_lengkap, password, role });
    await jobOpeningService.createJobOpening({ nama_job, status });
    req.body.responses = FormatResponse.successObject({
      data: null,
      additionalData: null,
    });
  } catch (error) {
    next(error);
  }
  next();
};

const resource = async (req, res, next) => {
  try {
    const { search_key, limit, status } = req.query;
    const data = await jobOpeningService.resourceJobOpening({
      search_key,
      limit,
      status,
    });
    req.body.responses = FormatResponse.successObject({
      data: data,
    });
  } catch (error) {
    next(error);
  }
  next();
};

export default {
  create,
  resource,
};
