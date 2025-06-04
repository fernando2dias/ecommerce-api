import {ErrorBase} from "./base.error.js";

export class ForbiddenError extends ErrorBase {
  constructor(message = "Not Authorized") {
    super(403, message);
  }
}
