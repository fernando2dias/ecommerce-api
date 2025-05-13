import { Joi } from "celebrate";
import { Address, orderAddressSchema } from "./address.model.js";
import { Company } from "./company.model.js"
import { OrderItem as OrderItem, orderItemSchema } from "./ordem-item.model.js";
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
    address: Joi.alternatives().conditional(
        "isDelivery", {
            is: true, 
            then: orderAddressSchema.required(), 
            otherwise: Joi.object().only().allow(null).default(null)
        }
    ),        
    document: Joi.alternatives().try(
        Joi.string().length(11).required(),
        Joi.string().length(14).required()
    ).default(null),
    isDelivery: Joi.boolean().required(),
    paymentMethod: Joi.object().keys({
        id: Joi.string().trim().required()
    }).required(),
    deliveryTax: Joi.number().min(0).required(),
    items: Joi.array().min(1).items(orderItemSchema).required(),
    status: Joi.string().only().allow(OrderStatus.PENDING).default(OrderStatus.PENDING)
});

export type QueryParamsOrder = {
    companyId?: string;
    beginDate?: Date;
    endDate?: Date;
    status?: OrderStatus;
}

export const searchParamsOrderQuerySchema = Joi.object().keys({
    companyId: Joi.string().trim(),
    beginDate: Joi.date(),
    endDate: Joi.date(),
    status: Joi.string().only().allow(...Object.values(OrderStatus))
});