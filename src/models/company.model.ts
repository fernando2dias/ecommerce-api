import { Joi } from "celebrate";

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
    ),
    companyName: Joi.string().required(),
    phone: Joi.string().regex(/(^[1-9]{1}[0-9]{1}[0-9]{8}$)|(^[1-9]{1}[0-9]{1}[9]{1}[0-9]{8}$)/).required(),
    openingHours: Joi.string().required(),
    address: Joi.string().required(),
    location: Joi.string().required(),
    deliveryTax: Joi.number().required(),
    active: Joi.boolean().only().allow(true).default(true)
});

export const CompanySchemaUpdate = Joi.object().keys({
    brand: Joi.allow(null),
    document: Joi.alternatives().try(
        Joi.string().length(11).required(),
        Joi.string().length(14).required()
    ),
    companyName: Joi.string().required(),
    phone: Joi.string().regex(/(^[1-9]{1}[0-9]{1}[0-9]{8}$)|(^[1-9]{1}[0-9]{1}[9]{1}[0-9]{8}$)/).required(),
    openingHours: Joi.string().required(),
    address: Joi.string().required(),
    location: Joi.string().required(),
    deliveryTax: Joi.number().required(),
    active: Joi.boolean().default(true)
});