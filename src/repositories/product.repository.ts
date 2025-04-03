import { CollectionReference, getFirestore } from "firebase-admin/firestore";
import { Product } from "../models/product.model.js";

export class ProductRepository {

    private collection: CollectionReference;

    constructor() {
        this.collection = getFirestore().collection("products");
    }
    async getAll(): Promise<Product[]> {
        const snapshot = await this.collection.get();
        const products = snapshot.docs.map(doc => {
            return {
                id: doc.id,
                ...doc.data()
            };
        }) as Product[];

        return products;
    }

    async getById(id: string): Promise<Product | null> {
        const doc = await this.collection.doc(id).get();
        if (doc.exists) {
            return {
                id: doc.id,
                ...doc.data()
            } as Product;
        } else {
            return null;
        }
    }

    async save(product: Product): Promise<string> {
        let productSaved = await this.collection.add(product);
        return productSaved.id
    }

    async update(product: Product): Promise<void> {
        let docRef = this.collection.doc(product.id);
        await docRef.set({
            name: product.name,
            description: product.description,
            price: product.price,
            image: product.image,
            category: product.category,
            active: product.active
        });
    }

    async delete(id: string): Promise<void> {
        await this.collection.doc(id).delete();
    }
}