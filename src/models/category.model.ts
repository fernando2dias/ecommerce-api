import { Joi } from "celebrate";

export type Category = {
    id: string;
    description: string;
    active: boolean;
}

export const CategorySchema = Joi.object().keys({
    description: Joi.string().required(),
    active: Joi.boolean().only().allow(true).default(true)
});

export const CategorySchemaUpdate = Joi.object().keys({
    description: Joi.string().required(),
    active: Joi.boolean().only().allow(true).default(true)
});