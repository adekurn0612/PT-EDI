// Import middleware and routers
// import SanitizeInput from "./sanitize/sanitizeInputMiddleware.js";
import errorHandler from "./error/errorHelper.js";
import successHandler from "./success/succesResponse.js";
import notfound_response from "./error/notFoundResponse.js";
import router from "./../routers/index.js";
// import authHandler from "./auth/index.js"; // eslint-disable-line

class Middlewares {
  static configure(app) {
    // Use middleware
    // app.use(SanitizeInput);
    // app.use(authHandler); // eslint-disable-line
    // Use routers
    app.use("/", router);
    app.use(errorHandler);
    app.use(notfound_response);
    app.use(successHandler);
  }
}

export default Middlewares;
