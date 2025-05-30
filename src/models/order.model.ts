import { Joi } from "celebrate";
import { Address, orderAddressSchema } from "./address.model.js";
import { Company } from "./company.model.js"
import { OrderItem as OrderItem, orderItemSchema } from "./ordem-item.model.js";
import { PaymentMethod } from "./payment-method.js";
import { Customer, customerSchema } from "./customer.model.js";
import { DocumentData, FieldValue, FirestoreDataConverter, QueryDocumentSnapshot, Timestamp } from "firebase-admin/firestore";

export class Order {
    id: string;
    company: Company;
    customer: Customer;
    address: Address;
    document: string;
    date: Date;
    isDelivery: boolean;
    paymentMethod: PaymentMethod;
    deliveryTax: number;
    items?: OrderItem[];
    status: OrderStatus;
    observation: string;
    subtotal: number;
    total: number;

    constructor(data: any){
        this.id = data.id;
        this.company = new Company(data.company);
        this.customer = data.customer;
        this.address = data.address;
        this.document = data.document;
        this.date = data.date instanceof Timestamp ? data.date.toDate() : data.date;
        this.isDelivery = data.isDelivery;
        this.paymentMethod = new PaymentMethod(data.paymentMethod);
        this.deliveryTax = data.deliveryTax;
        this.items = data.items?.map((item: any) => new OrderItem(item)) ?? [];
        this.status = data.status ?? OrderStatus.PENDING;
        this.observation = data.observation ?? null;
        this.subtotal = data.subtotal ?? 0;
        this.total = data.total ?? 0;
    }

    getSubTotal(): number {
        return this.items?.map(item => item.getTotal()).reduce((total, next) => total + next, 0) ?? 0;
    }
    getTotal(): number {
        return this.getSubTotal() + (this.isDelivery ? this.deliveryTax : 0);
    }

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
    status: Joi.string().only().allow(OrderStatus.PENDING).default(OrderStatus.PENDING),
    observation: Joi.string().trim().allow(null).default(null)
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

export const changeStatusOrderSchema = Joi.object().keys({
    status: Joi.string().only().allow(
        OrderStatus.APPROVED,
        OrderStatus.DELIVERY,
        OrderStatus.COMPLETED,
        OrderStatus.CANCELED
    ).required()
});

export const orderConverter: FirestoreDataConverter<Order> = {
    toFirestore: (order: Order): DocumentData => {
        return {
            company: {
                id: order.company.id,
                brand: order.company.brand,
                document: order.company.document,
                companyName: order.company.companyName,
                phone: order.company.phone,
                address: order.company.address,
                location: order.company.location
            },
            customer: {
                name: order.customer.name,
                phone: order.customer.phone
            },
            address: {
                street: order.address?.street,
                number: order.address?.number,
                complement: order.address?.complement,
                city: order.address?.city,
                state: order.address?.state,
                zipCode: order.address?.zipCode
            },
            document: order.document,
            date: FieldValue.serverTimestamp(),
            isDelivery: order.isDelivery,
            paymentMethod: {
                id: order.paymentMethod.id,
                description: order.paymentMethod.description
            },
            deliveryTax: order.deliveryTax,
            status: order.status,
            observation: order.observation,
            subTotal: order.getSubTotal(),
            total: order.getTotal(),
        };
    },
    fromFirestore: (snapshot: QueryDocumentSnapshot): Order => {
        return new Order({
            id: snapshot.id,
            ...snapshot.data()
        });
    }
}