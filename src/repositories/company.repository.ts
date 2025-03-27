import { CollectionReference, getFirestore } from "firebase-admin/firestore";
import { Company } from "../models/company.model.js";

export class CompanyRepository {

    private collection: CollectionReference;

    constructor() {
        this.collection = getFirestore().collection("companies");
    }
    async getAll(): Promise<Company[]> {
        const snapshot = await this.collection.get();
        const companies = snapshot.docs.map(doc => {
            return {
                id: doc.id,
                ...doc.data()
            };
        }) as Company[];

        return companies;
    }

    async getById(id: string): Promise<Company | null> {
        const doc = await this.collection.doc(id).get();
        if (doc.exists) {
            return {
                id: doc.id,
                ...doc.data()
            } as Company;
        } else {
            return null;
        }
    }

    async save(company: Company): Promise<string> {
        let companySaved = await this.collection.add(company);
        return companySaved.id
    }

    async update(company: Company): Promise<void> {
        let docRef = this.collection.doc(company.id);
        await docRef.set(company);
    }

    async delete(id: string): Promise<void> {
        await this.collection.doc(id).delete();
    }
}