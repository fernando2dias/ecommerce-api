import { Joi } from "celebrate";

export type Customer = {
    name: string;
    phone: string;
}

export const customerSchema = Joi.object().keys({
    name: Joi.string().trim().min(5).required(),
    phone: Joi.string().required()
});