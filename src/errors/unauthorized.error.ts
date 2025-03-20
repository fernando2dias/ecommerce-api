import { ErrorBase } from "./base.error";

export class UnauthorizedError extends ErrorBase{
    constructor(message = "Not Authorized"){
        super(401, message);
    }
}