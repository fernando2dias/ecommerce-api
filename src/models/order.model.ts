import { Joi } from "celebrate";
import { Address, orderAddressSchema } from "./address.model.js";
import { Company } from "./company.model.js"
import { OrderItem as OrderItem } from "./ordem-item.model.js";
import { PaymentMethod } from "./payment-method.js";
import { Customer, customerSchema } from "./customer.model.js";

export type Order = {
    company: Company;
    customer: Customer;
    address: Address;
    document: string;
    date: Date;
    isDelivery: boolean;
    paymentMethod: PaymentMethod;
    deliveryTax: number;
    items: OrderItem[];
    status: OrderStatus;
}

export enum OrderStatus{
    PENDING = 'PENDING',
    APPROVED = 'APPROVED',
    DELIVERY = 'DELIVERY',
    COMPLETED = 'COMPLETED',
    CANCELED = 'CANCELED'
}

export const newOrderSchema = Joi.object().keys({
    company: Joi.object().keys({
        id: Joi.string().trim().required()
    }).required(),
    customer: customerSchema.required(),
    address: orderAddressSchema.required(),
    document: Joi.alternatives().try(
        Joi.string().length(11).required(),
        Joi.string().length(14).required()
    ).default(null),
    isDelivery: Joi.boolean().required(),
    paymentMethod: Joi.object().keys({
        id: Joi.string().trim().required()
    }).required(),
    deliveryTax: Joi.number().min(0).required(),
    items: Joi.array(),
    status: Joi.string().only().allow(OrderStatus.PENDING).default(OrderStatus.PENDING)
});