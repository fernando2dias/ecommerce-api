import { Joi } from "celebrate";
import { phoneRegexPattern } from "../utils/regex-utils.js";

export type Customer = {
    name: string;
    phone: string;
}

export const customerSchema = Joi.object().keys({
    name: Joi.string().trim().min(5).required(),
    phone: Joi.string().regex(phoneRegexPattern).required()
});