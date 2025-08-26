export default class HTMLResponseError extends Error {
  public statusCode: number;

  constructor(message: string, statusCode: number) {
    super(message);
    this.name = "HTMLResponseError";
    this.statusCode = statusCode;
  }
}
