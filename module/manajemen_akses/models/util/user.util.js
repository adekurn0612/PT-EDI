// userExtensions.js
import { prototype, findOne } from "../user.models";

prototype.validateUsername = function (username) {
  return findOne({ where: { username } })
    .then((user) => user === null)
    .catch((error) => {
      throw new DataDuplicateError({
        statusCode: 400,
        message: "User already exist",
      });
    });
};
