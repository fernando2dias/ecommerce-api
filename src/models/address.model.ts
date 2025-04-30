import { Joi } from "celebrate";

export type Address = {
    zipCode: string;
    street: string;
    number: string;
    complement: string;
    city: string;
    state: string;
}

export const orderAddressSchema = Joi.object().keys({
    zipCode: Joi.string().allow(null).default(null),
    street: Joi.string().trim().required(),
    number: Joi.string().trim().required(),
    complement: Joi.string().trim().required(),
    city: Joi.string().trim().required(),
    state: Joi.string().trim().length(2).uppercase().required()

});