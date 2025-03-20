import { ErrorBase } from "./base.error";

export class EmailAlreadyExistsError extends ErrorBase {
    constructor(message = "The email address is already in use by another account.") {
        super(409, message);
    }
}