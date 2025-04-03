import { Category } from "./category.model.js";
import { Joi } from "celebrate";

export type Product ={
    id: string;
    name: string;
    description: string;
    price: number;
    image: string;
    category: Category;
    active: boolean;
}

export const newProductSchema = Joi.object().keys({
    name: Joi.string().min(3).required(),
    description: Joi.string().allow(null).default(null),
    price: Joi.number().positive().required(),
    image: Joi.string().base64().allow(null),
    category: Joi.object().keys({
        id: Joi.string().required()
    }).required(),
    active: Joi.boolean().only().allow(true).default(true)
});

export const updateProductSchema = Joi.object().keys({
    name: Joi.string().min(3).required(),
    description: Joi.string().allow(null).default(null),
    price: Joi.number().positive().required(),
    image: Joi.alternatives().try(
        Joi.string().base64().required(),
        Joi.string().uri().required()
    ).required(),
    category: Joi.object().keys({
        id: Joi.string().required()
    }).required(),
    active: Joi.boolean().only().allow(true).default(true)
});