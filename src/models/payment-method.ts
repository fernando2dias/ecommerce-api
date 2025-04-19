import { Joi } from "celebrate";

export type PaymentMethod = {
    id: string;
    description: string;
    active: boolean;
}

export const newPaymentSchema = Joi.object().keys({
    description: Joi.string().min(3).required(),
    active: Joi.boolean().only().allow(true).default(true)
});

export const updatePaymentSchema = Joi.object().keys({
    description: Joi.string().min(3).required(),
    active: Joi.boolean().required()
});
