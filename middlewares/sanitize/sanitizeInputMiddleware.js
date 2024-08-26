// Fungsi untuk membersihkan kata kunci berbahaya
const CleanKeyword = (inputStr) => {
  if (typeof inputStr !== "string") {
    return inputStr;
  }

  // Definisi kata kunci SQL yang perlu dihapus
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

  // Menggunakan regex untuk menggantikan semua karakter berbahaya
  const regex = new RegExp(charsToReplace.join("|"), "gi");
  return inputStr.replace(regex, "");
};

// Fungsi untuk membersihkan input objek
const CleanInput = (input) => {
  if (typeof input === "object" && input !== null) {
    for (let key in input) {
      if (Object.prototype.hasOwnProperty.call(input, key)) {
        if (typeof input[key] === "string") {
          input[key] = CleanKeyword(input[key]);
        }
      }
    }
  }
  return input;
};

// Middleware untuk membersihkan semua input dari request
const cleanMiddleware = (req, res, next) => {
  try {
    // Membersihkan query parameters
    req.query = CleanInput(req.query);

    // Membersihkan request body
    req.body = CleanInput(req.body);

    // Membersihkan route parameters
    req.params = CleanInput(req.params);
    next();
  } catch (error) {
    req.body.responses = format_responseHelper.error_server(error);
  }
};

export default cleanMiddleware;
