import {ErrorBase} from "./base.error.js";

export class UnauthorizedError extends ErrorBase {
  constructor(message = "Not Authorized") {
    super(401, message);
  }
}
