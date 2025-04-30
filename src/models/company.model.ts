import { Joi } from "celebrate";
import { phoneRegexPattern } from "../utils/regex-utils.js";

export type Company = {
    id: string;
    brand: string;
    document: string;
    companyName: string;
    phone: string;
    openingHours: string;
    address: string;
    location: string;
    deliveryTax: number;
    active: boolean;
}

export const CompanySchema = Joi.object().keys({
    brand: Joi.string().base64().required(),
    document: Joi.alternatives().try(
        Joi.string().length(11).required(),
        Joi.string().length(14).required()
    ).required(),
    companyName: Joi.string().required(),
    phone: Joi.string().regex(phoneRegexPattern).required(),
    openingHours: Joi.string().required(),
    address: Joi.string().required(),
    location: Joi.string().required(),
    deliveryTax: Joi.number().required(),
    active: Joi.boolean().only().allow(true).default(true)
});

export const CompanySchemaUpdate = Joi.object().keys({
    brand: Joi.alternatives().try(
        Joi.string().base64().required(),
        Joi.string().uri().required()
    ).required(),
    document: Joi.alternatives().try(
        Joi.string().length(11).required(),
        Joi.string().length(14).required()
    ).required(),
    companyName: Joi.string().required(),
    phone: Joi.string().regex(phoneRegexPattern).required(),
    openingHours: Joi.string().required(),
    address: Joi.string().required(),
    location: Joi.string().required(),
    deliveryTax: Joi.number().required(),
    active: Joi.boolean().default(true)
});