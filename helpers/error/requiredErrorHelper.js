class RequiredError extends Error {
  constructor({ message, data }) {
    super("Required error");
    this.data = data;
    this.message = message;
  }
}

export default RequiredError;
