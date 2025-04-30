import { Product } from "./product.model.js";

export type OrderItems = {
    product: Product;
    quantity: number;
    observation: string;
}