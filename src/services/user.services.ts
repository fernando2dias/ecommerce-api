import { getFirestore } from "firebase-admin/firestore";
import { User } from "../models/user.model";
import { NotFoundError } from "../errors/not-found.error";

export class UserService {

    async getAll(): Promise<User[]> {
        const snapshot = await getFirestore().collection("users").get();
        const users = snapshot.docs.map(doc => {
            return {
                id: doc.id,
                ...doc.data()
            };
        }) as User[];

        return users;
    }

    async getById(id: string): Promise<User> {
        const doc = await getFirestore().collection("users").doc(id).get();
        if (doc.exists) {
            return {
                id: doc.id,
                ...doc.data()
            } as User;
        } else {
            throw new NotFoundError("User is not found!");
        }
    }

    async save(user: User): Promise<string> {
        let userSaved = await getFirestore().collection("users").add(user);
        return userSaved.id
    }

    async update(user: User): Promise<void> {
        let docRef = getFirestore().collection("users").doc(user.id);

        if ((await docRef.get()).exists) {
            await docRef.set({
                name: user.name,
                email: user.email
            });
        } else {
            throw new NotFoundError("User is not found!");
        }
    }

    async delete(id: string): Promise<void> {
        let docRef = getFirestore().collection("users").doc(id);
        if ((await docRef.get()).exists) {
            docRef.delete();
        } else {
            throw new NotFoundError("User is not found!");
        }
    }

}