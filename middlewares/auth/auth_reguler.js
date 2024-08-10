// let jwt = require("@helpers/jwt/jwt");
// const { ForbiddenError } = require("@helpers/error");
// const forbiddenError = require("@helpers/error/forbiddenErrorHelper");

// async function authRegulerHandler(req, res, next) {
//   try {
//     if (res.headersSent) {
//       return next();
//     } else if (req.headers.token) {
//       let hasil = await jwt.verifyToken(req.headers.token);
//       req.headers.user = hasil;
//       return next();
//     } else {
//       throw new ForbiddenError({ message: "Anda belum login" });
//     }
//   } catch (error) {
//     next(error);
//   }
// }

// module.exports = {
//   authRegulerHandler,
// };
