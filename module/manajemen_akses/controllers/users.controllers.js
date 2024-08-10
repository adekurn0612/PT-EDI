import Check from "../../../helpers/validation/check.js";
import userServices from "../services/users/index.js";
import FormatResponse from "./../../../helpers/response/responseHelper.js";

const create = async (req, res, next) => {
  try {
    const { username, nama_lengkap, password } = req.body;

    let array = [
      { method: `string`, key: password, variable_name: `password` },
      { method: `string`, key: username, variable_name: `username` },
      { method: `string`, key: nama_lengkap, variable_name: `nama lengkap` },
    ];
    await Check.multiple_check_stringvar({ array });

    await userServices.createUser({ username, nama_lengkap, password });
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
