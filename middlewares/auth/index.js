// import { ForbiddenError } from "./../../helpers/error/index";
// import {
//   bypass_validasi_token,
//   token_based_url,
//   role_based_url,
//   is_redis_session,
// } from "./auth_settings";
// import validationError from "@helpers/error/validationErrorHelper";
// import { authRegulerRedisHandler, authRegulerHandler } from "./auth_reguler";

// async function authHandler(req, res, next) {
//   try {
//     if (res.headersSent) {
//       // If headers have already been sent, just call the next middleware
//       return next();
//     } else {
//       const reqUrl = req.url;

//       const matchedBypass = bypass_validasi_token.find((setting) => {
//         if (!setting) {
//           return next();
//         } else if (setting.url === "*") {
//           return true; // Jika pola URL adalah '*', token diperlukan untuk semua endpoint
//         } else if (setting.url.endsWith("*")) {
//           const prefix = setting.url.slice(0, -1);
//           return reqUrl.startsWith(prefix);
//         } else {
//           return reqUrl === setting.url;
//         }
//       });

//       if (matchedBypass) {
//         return next();
//       }
//       // Cari pengaturan token_based_url yang cocok dengan URL saat ini
//       const matchedSettingsTokenBased = token_based_url.find((setting) => {
//         if (!setting) {
//           return next();
//         } else if (setting.url === "*") {
//           return true; // Jika pola URL adalah '*', token diperlukan untuk semua endpoint
//         } else if (setting.url.endsWith("*")) {
//           const prefix = setting.url.slice(0, -1);
//           return reqUrl.startsWith(prefix);
//         } else {
//           return reqUrl === setting.url;
//         }
//       });

//       const matchedSettingsRoleBased = role_based_url.find((setting) => {
//         if (!setting) {
//           return next();
//         } else if (setting.url === "*") {
//           return true;
//         } else if (setting.url.endsWith("*")) {
//           const prefix = setting.url.slice(0, -1);
//           return reqUrl.startsWith(prefix);
//         } else {
//           return reqUrl === setting.url;
//         }
//       });

//       let switcher;
//       if (matchedSettingsTokenBased && !matchedSettingsRoleBased) {
//         switcher = "token_based";
//       } else if (matchedSettingsRoleBased) {
//         switcher = "role_based";
//       }

//       if (switcher === "token_based") {
//         if (
//           matchedSettingsTokenBased.method &&
//           matchedSettingsTokenBased.method.includes("*") &&
//           matchedSettingsTokenBased.method.length !== 1
//         ) {
//           throw new validationError(
//             "Invalid configuration: If method includes '*', its length must be 1"
//           );
//         }
//         if (
//           matchedSettingsTokenBased.method &&
//           matchedSettingsTokenBased.method.includes("*")
//         ) {
//           if (is_redis_session) {
//             await authRegulerRedisHandler(req, res, next);
//           } else {
//             await authRegulerHandler(req, res, next);
//           }
//         } else if (
//           matchedSettingsTokenBased.method &&
//           matchedSettingsTokenBased.method.includes(req.method)
//         ) {
//           if (is_redis_session) {
//             await authRegulerRedisHandler(req, res, next);
//           } else {
//             await authRegulerHandler(req, res, next);
//           }
//         } else {
//           throw new ForbiddenError({ message: "Method not allowed" });
//         }

//         //masih belum karena belum tau role - endpoint nya gimana
//       } else if (switcher === "role_based") {
//         // Cari pengaturan role_based_url yang cocok dengan URL saat ini
//         if (
//           matchedSettingsRoleBased.method &&
//           matchedSettingsRoleBased.method.includes("*") &&
//           matchedSettingsRoleBased.method.length !== 1
//         ) {
//           throw new validationError(
//             "Invalid configuration: If method includes '*', its length must be 1"
//           );
//         }
//         if (
//           matchedSettingsRoleBased.method &&
//           matchedSettingsRoleBased.method.includes("*")
//         ) {
//           // Jika metode HTTP '*': semua metode HTTP diizinkan
//           return next();
//         } else if (
//           matchedSettingsRoleBased.method &&
//           matchedSettingsRoleBased.method.includes(req.method)
//         ) {
//           // Jika metode HTTP permintaan sesuai dengan yang diizinkan
//           return next();
//         } else {
//           throw new ForbiddenError({ message: "Method not allowed" });
//         }
//       } else {
//         return next();
//       }
//     }
//   } catch (error) {
//     next(error);
//   }
// }

// export default authHandler;
