import { Joi } from "celebrate";
import { Product } from "./product.model.js";
import { DocumentData, FirestoreDataConverter, QueryDocumentSnapshot } from "firebase-admin/firestore";

export class OrderItem {
    id: string;
    product: Product;
    quantity: number;
    observation: string;

    constructor(data: OrderItem | any) {
        this.id = data.id;
        this.product = new Product(data.product);
        this.quantity = data.quantity;
        this.observation = data.observation ?? null;
    }

    getTotal(): number {
        return this.product.price * this.quantity;
    }
}

export const orderItemSchema = Joi.object().keys({
    product: Joi.object().keys({
        id: Joi.string().trim().required()
    }).required(),
    quantity: Joi.number().integer().positive().required(),
    observation: Joi.string().trim().allow(null).default(null)

});

export const orderItemConverter: FirestoreDataConverter<OrderItem> = {
    toFirestore: (item: OrderItem): DocumentData => {
        return {
                 product: {
                    id: item.product.id,
                    name: item.product.name,
                    description: item.product.description,
                    price: item.product.price,
                    image: item.product.image,
                    category: {
                        id: item.product.category.id,
                        description: item.product.category.description
                    }
                },
                quantity: item.quantity,
                observation: item.observation
            };
    },
    fromFirestore: (snapshot: QueryDocumentSnapshot): OrderItem => {
        return new OrderItem({
            id: snapshot.id,
            ...snapshot.data()
        }); 
    }
}