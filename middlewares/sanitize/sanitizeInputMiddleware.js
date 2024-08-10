import format_responseHelper from "./../../helpers/constants/constantsResponseHelper.js";

const CleanKeyword = (inputStr) => {
  if (typeof sanitizedInput !== "string") {
    return inputStr;
  }
  // Define a list of characters that need to be replaced
  const charsToReplace = [
    ";",
    "--",
    "'",
    '"',
    "=",
    "<",
    ">",
    "(",
    ")",
    "UNION",
    "SELECT",
    "FROM",
    "WHERE",
    "INSERT",
    "UPDATE",
    "DELETE",
    "DROP",
    "CREATE",
    "ALTER",
    "EXEC",
  ];

  // Replace each character with an empty string
  charsToReplace.forEach((char) => {
    inputStr = inputStr.split(char).join("");
  });

  return inputStr;
};
const CleanInput = (input) => {
  if (typeof input === "object" && input !== null) {
    for (let key in input) {
      // Use Object.prototype.hasOwnProperty.call() to avoid issues
      if (Object.prototype.hasOwnProperty.call(input, key)) {
        if (typeof input[key] === "string") {
          // Remove characters commonly used in SQL injection
          // input[key] = input[key].replace(/[\';\-\-]/g, '');
          input[key] = CleanKeyword(input[key]);
        }
      }
    }
  }
  return input;
};

const cleanMiddleware = (req, res, next) => {
  try {
    // Clean query parameters
    req.query = CleanInput(req.query);

    // Clean request body
    req.body = CleanInput(req.body);

    // Clean route parameters
    req.params = CleanInput(req.params);
    next();
  } catch (error) {
    req.body.responses = format_responseHelper.error_server(error);
  }
};

export default { cleanMiddleware };
