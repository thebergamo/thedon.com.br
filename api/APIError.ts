export class APIError extends Error {
  private statusCode: number;
  private errors: any;

  constructor(message: string, statusCode: number, errors: any) {
    super(message);

    this.statusCode = statusCode;
    this.errors = errors;
  }

  getErrorMessages() {
    return this.errors.errors[0].message;
  }

  getStatusCode() {
    return this.statusCode;
  }
}
