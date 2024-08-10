import FormatResponse from "./../../helpers/response/responseHelper.js";
import {
  DataDuplicateError,
  ValidationError,
  ForbiddenError,
  RequiredError,
  DataNotFoundError,
  errorInFunction,
} from "./../../helpers/error/index.js";

function ErrorHandler(error, req, res, next) {
  console.log(error);
  if (error && !res.headerSent) {
    if (process.env.APP === "PROD") {
      console.error = function () {};
      console.log = function () {};
    }
    if (
      error.name === "SequelizeDatabaseError" ||
      error.name === "SequelizeValidationError"
    ) {
      return res.status(500).json(FormatResponse.errorServer({ error }));
    } else if (error instanceof ValidationError) {
      return res
        .status(200)
        .json(
          FormatResponse.error203({ message: error.message, data: error.data })
        );
    } else if (error instanceof DataNotFoundError) {
      return res
        .status(200)
        .json(FormatResponse.error404({ message: error.message }));
    } else if (error instanceof DataDuplicateError) {
      return res
        .status(200)
        .json(FormatResponse.error204({ message: error.message }));
    } else if (error instanceof ForbiddenError) {
      return res
        .status(200)
        .json(
          FormatResponse.error403({ message: error.message, error: error.data })
        );
    } else if (error instanceof RequiredError) {
      return res
        .status(200)
        .json(
          FormatResponse.error403({ message: error.message, error: error.data })
        );
    } else if (error instanceof errorInFunction) {
      return res
        .status(200)
        .json(
          FormatResponse.error400({ message: error.message, error: error.data })
        );
      // } else if (error instanceof axiosErrorHelper) {
      //   return res
      //     .status(200)
      //     .json(
      //       FormatResponse.error400({ message: error.message, error: error.data })
      //     );
    } else {
      return res.status(500).json(FormatResponse.errorServer({ error }));
    }
  } else {
    next();
  }
}

export default ErrorHandler;
