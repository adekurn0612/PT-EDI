import jwt from "jsonwebtoken"; // Import the jwt library directly
import { errorInFunction } from "../error/index.js"; // Ensure this is a valid import

const KEY_JWT = process.env.KEY;

// Jwt class to handle token operations
class Jwt {
  // Method to generate a token
  static async generateToken(data) {
    try {
      if (data) {
        return jwt.sign(data, KEY_JWT); // Use jwt.sign directly
      } else {
        throw new errorInFunction({
          data: null,
          message: "Data untuk JWT tidak ada",
        });
      }
    } catch (error) {
      throw new errorInFunction({
        data: error,
        message: "Token generation error",
      });
    }
  }

  // Method to verify a token
  static async verifyToken(token) {
    try {
      if (token) {
        return jwt.verify(token, KEY_JWT); // Use jwt.verify directly
      } else {
        throw new errorInFunction({
          data: null,
          message: "Token JWT belum dikirim",
        });
      }
    } catch (error) {
      throw new errorInFunction({
        data: error,
        message: "Token verification error",
      });
    }
  }
}

export default Jwt;
