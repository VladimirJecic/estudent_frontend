import { ServerResponse } from "@/types/items";

export default class ServerError extends Error {
  public statusCode: number;
  public data: any;

  constructor(serverResponse: ServerResponse) {
    super(serverResponse.message);
    this.name = "ServerError";
    this.statusCode = serverResponse.statusCode;
    this.data = serverResponse.data;
  }
}
