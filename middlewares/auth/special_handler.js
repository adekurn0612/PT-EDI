import Jwt from "./../../helpers/jwt/jwt.js";
import { ForbiddenError } from "./../../helpers/error/index.js";

function authSpecialHandler(allowedRoles) {
  return async (req, res, next) => {
    try {
      // Cek jika token ada di headers
      if (!req.headers.token) {
        throw new ForbiddenError({ message: "Anda belum login" });
      }

      // Verifikasi token
      const hasil = await Jwt.verifyToken(req.headers.token);

      // Cek apakah pengguna memiliki role yang diizinkan
      if (allowedRoles.includes(hasil.data.role)) {
        req.user = hasil; // Menyimpan informasi pengguna di req.user
        next(); // Lanjutkan ke middleware berikutnya atau handler
      } else {
        throw new ForbiddenError({
          message: "Anda tidak memiliki akses ke resource ini",
        });
      }
    } catch (error) {
      next(error); // Menangani error jika ada
    }
  };
}

export default {
  authSpecialHandler,
};
