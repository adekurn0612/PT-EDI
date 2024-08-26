import Jwt from "./../../helpers/jwt/jwt.js";
import { ForbiddenError } from "./../../helpers/error/index.js";

async function authRegulerHandler(req, res, next) {
  try {
    // Check for token in Authorization header
    const token = req.headers.authorization?.split(" ")[1]; // Assumes 'Bearer <token>'

    if (token) {
      // Verify token
      const hasil = await Jwt.verifyToken({ token });
      req.user = hasil; // Store user info in req.user
      return next();
    } else {
      throw new ForbiddenError({ message: "Anda belum login" });
    }
  } catch (error) {
    next(error); // Forward error to the error handler middleware
  }
}

export default authRegulerHandler;
