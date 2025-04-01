import { CollectionReference, getFirestore } from "firebase-admin/firestore";
import { Category } from "../models/category.model.js";

export class CategoryRepository {

    private collection: CollectionReference;

    constructor() {
        this.collection = getFirestore().collection("categories");
    }
    async getAll(): Promise<Category[]> {
        const snapshot = await this.collection.get();
        const categories = snapshot.docs.map(doc => {
            return {
                id: doc.id,
                ...doc.data()
            };
        }) as Category[];

        return categories;
    }

    async getById(id: string): Promise<Category | null> {
        const doc = await this.collection.doc(id).get();
        if (doc.exists) {
            return {
                id: doc.id,
                ...doc.data()
            } as Category;
        } else {
            return null;
        }
    }

    async save(category: Category): Promise<string> {
        let categorySaved = await this.collection.add(category);
        return categorySaved.id
    }

    async update(category: Category): Promise<void> {
        let docRef = this.collection.doc(category.id);
        await docRef.set(category);
    }

    async delete(id: string): Promise<void> {
        await this.collection.doc(id).delete();
    }
}