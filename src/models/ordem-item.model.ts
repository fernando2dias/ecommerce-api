import { Product } from "./product.model.js";

export type OrderItem = {
    product: Product;
    quantity: number;
    observation: string;
}