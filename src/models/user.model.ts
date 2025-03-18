import { Joi } from "celebrate";

export type User = {
    id: string;
    name: string;
    email: string;
    age: number;
}

export const userSchema = {
    id: Joi.string(),
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    age: Joi.number().required()
}