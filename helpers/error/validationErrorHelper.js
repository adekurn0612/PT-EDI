class ValidationError extends Error {
  constructor({ message, data }) {
    super("Validation failed");
    this.data = data;
    this.message = message;
  }
}

export default ValidationError;
