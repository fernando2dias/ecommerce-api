import { CollectionReference, getFirestore } from "firebase-admin/firestore";
import { PaymentMethod } from "../models/payment-method.js";

export class PaymentMethodRepository {

    private collection: CollectionReference;

    constructor() {
        this.collection = getFirestore().collection("payment-methods");
    }

    async getAll(): Promise<PaymentMethod[]> {
        const snapshot = await this.collection.get();
        const paymentMethods = snapshot.docs.map(doc => {
            return {
                id: doc.id,
                ...doc.data()
            };
        }) as PaymentMethod[];

        return paymentMethods;
    }

    async getById(id: string): Promise<PaymentMethod | null> {
        const doc = await this.collection.doc(id).get();

        if (doc.exists) {
            return {
                id: doc.id,
                ...doc.data()
            } as PaymentMethod;
        } else {
            return null;
        }
    }

    async save(paymentMethod: PaymentMethod): Promise<string> {
        let paymentMethodSaved = await this.collection.add(paymentMethod);
        return paymentMethodSaved.id;
    }

    async update(paymentMethod: PaymentMethod): Promise<void> {
        let docRef = this.collection.doc(paymentMethod.id);
        await docRef.set(paymentMethod);
    }

    async delete(id: string): Promise<void> {
        await this.collection.doc(id).delete();
    }
}