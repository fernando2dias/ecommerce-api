import { Joi } from "celebrate";

export type User = {
    id: string;
    name: string;
    email: string;
    age: number;
    password?: string;
}

export const userSchema = Joi.object().keys({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    age: Joi.number().required(),
    password: Joi.string().min(6).required()
});

export const authLoginSchema = Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required()
});