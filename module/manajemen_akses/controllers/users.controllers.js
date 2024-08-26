import Check from "../../../helpers/validation/check.js";
import userServices from "../services/users/index.js";
import FormatResponse from "./../../../helpers/response/responseHelper.js";

const create = async (req, res, next) => {
  try {
    const { email, nama_lengkap, password, role } = req.body;

    let array = [
      { method: `string`, key: password, variable_name: `password` },
      { method: `string`, key: email, variable_name: `email` },
      { method: `string`, key: nama_lengkap, variable_name: `nama lengkap` },
      { method: `string`, key: role, variable_name: `role` },
    ];
    await Check.multiple_check_stringvar({ array });

    await userServices.createUser({ email, nama_lengkap, password, role });
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
