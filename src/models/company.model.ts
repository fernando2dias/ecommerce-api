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

export const newCompanySchema = Joi.object().keys({
    brand: Joi.string().required(),
    document: Joi.string().required(),
    companyName: Joi.string().required(),
    phone: Joi.string().required(),
    openingHours: Joi.string().required(),
    address: Joi.string().required(),
    location: Joi.string().required(),
    deliveryTax: Joi.number().required(),
    active: Joi.boolean().required()
});