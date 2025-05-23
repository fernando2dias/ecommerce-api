import { DocumentData, FirestoreDataConverter, QueryDocumentSnapshot } from "firebase-admin/firestore";
import { Category } from "./category.model.js";
import { Joi } from "celebrate";

export class Product {
    id: string;
    name: string;
    description: string;
    price: number;
    image: string;
    category: Category;
    active: boolean;

    constructor(data: Product | any) {
        this.id = data.id;
        this.name = data.name;
        this.description = data.description;
        this.price = data.price;
        this.image = data.image;
        this.category = new Category(data.category);
        this.active = data.active ?? true;
    }
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

export const searchQuerySchema = Joi.object().keys({
    categoryId: Joi.string().required()
});

export const productConverter: FirestoreDataConverter<Product> ={
    toFirestore: (product: Product): DocumentData => {
        return {
            name: product.name,
            description: product.description,
            price: product.price,
            image: product.image,
            category: {
                id: product.category.id,
                description: product.category.description,
                active: product.category.active
            },
            active: product.active
        };
    },
    fromFirestore: (snapshot: QueryDocumentSnapshot): Product =>{
        return new Product({
            id: snapshot.id,
            ...snapshot.data()
        });
    }
}