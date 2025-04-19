import { CollectionReference, getFirestore, QuerySnapshot } from "firebase-admin/firestore";
import { Product } from "../models/product.model.js";

export class ProductRepository {

    private collection: CollectionReference;

    constructor() {
        this.collection = getFirestore().collection("products");
    }
    async getAll(): Promise<Product[]> {
        const snapshot = await this.collection.get();
        return this.snapshotToArray(snapshot);
    }

    async search(categoryId: string): Promise<Product[]>{
        const snapshot = await this.collection.where("category.id", "==", categoryId).get();
        return this.snapshotToArray(snapshot);
    }

    async getCountCategory(categoryId: string): Promise<number>{
        const snapshot = await this.collection.where("category.id", "==", categoryId).count().get();
        return snapshot.data().count;
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

    private snapshotToArray(snapshot: QuerySnapshot): Product[]{
        return snapshot.docs.map(doc => {
            return {
                id: doc.id,
                ...doc.data()
            };
        }) as Product[];
    }
}