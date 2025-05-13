import { Joi } from "celebrate";
import { Product } from "./product.model.js";

export type OrderItem = {
    product: Product;
    quantity: number;
    observation: string;
}

export const orderItemSchema = Joi.object().keys({
    product: Joi.object().keys({
        id: Joi.string().trim().required()
    }).required(),
    quantity: Joi.number().integer().positive().required(),
    observation: Joi.string().trim().allow(null).default(null)

});