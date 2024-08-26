import Check from "../../../helpers/validation/check.js";
import userServices from "../services/users/index.js";
import FormatResponse from "./../../../helpers/response/responseHelper.js";

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    let array = [
      { method: `string`, key: password, variable_name: `password` },
      { method: `string`, key: email, variable_name: `username` },
    ];
    await Check.multiple_check_stringvar({ array });

    const data = await userServices.loginUser({ email, password });
    req.body.responses = FormatResponse.successObject({
      data: data,
      additionalData: null,
    });
  } catch (error) {
    next(error);
  }
  next();
};

export default {
  login,
};
