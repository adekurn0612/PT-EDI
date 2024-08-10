import FormatResponse from "../../helpers/response/responseHelper.js";

function NotFoundHandler(req, res, next) {
  if (res.headersSent) {
    return next();
  } else if (!req.body.responses) {
    res.status(404).json(FormatResponse.error404("Url Not Found!"));
  } else {
    return next();
  }
}

export default NotFoundHandler;
