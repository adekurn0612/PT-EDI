// Import middleware dan router
import cleanMiddleware from "./sanitize/sanitizeInputMiddleware.js"; // Sesuaikan path jika perlu
import errorHandler from "./error/errorHelper.js";
import successHandler from "./success/succesResponse.js";
import notfound_response from "./error/notFoundResponse.js";
import router from "./../routers/index.js";
// import authHandler from "./auth/index.js"; // eslint-disable-line

class Middlewares {
  static configure(app) {
    // Gunakan middleware
    app.use(cleanMiddleware);
    // app.use(authHandler); // eslint-disable-line
    // Gunakan router
    app.use("/", router);
    app.use(errorHandler);
    app.use(notfound_response);
    app.use(successHandler);
  }
}

export default Middlewares;
