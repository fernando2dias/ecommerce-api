import { NextFunction, Request, Response } from "express";
import { getFirestore } from "firebase-admin/firestore";
import { ValidationError } from "../errors/validation.error";
import { NotFoundError } from "../errors/not-found.error";

export class UsersController {

    static async getAll(req: Request, res: Response, next: NextFunction) {
        const snapshot = await getFirestore().collection("users").get();
        const users = snapshot.docs.map(doc => {
            return {
                id: doc.id,
                ...doc.data()
            };
        });

        res.send(users);
    }

    static async getById(req: Request, res: Response, next: NextFunction) {
        let userId = req.params.id;
        const doc = await getFirestore().collection("users").doc(userId).get();
        if (doc.exists) {
            res.send({
                id: doc.id,
                ...doc.data()
            });
        } else {
            throw new NotFoundError("User is not found!");
        }
    };

    static async delete(req: Request, res: Response, next: NextFunction) {
        let userId = req.params.id;
        let docRef = getFirestore().collection("users").doc(userId);
        if ((await docRef.get()).exists) {
            docRef.delete();
            res.status(204).end();
        } else {
            throw new NotFoundError("User is not found!");
        }
    }

    static async update(req: Request, res: Response, next: NextFunction) {
        let userId = req.params.id;
        let user = req.body;
        let docRef = getFirestore().collection("users").doc(userId);

        if ((await docRef.get()).exists) {
            await docRef.set({
                name: user.name,
                email: user.email
            });
            res.send({ message: "User updated successfully" });
        } else {
            throw new NotFoundError("User is not found!");
        }

    }

    static async save(req: Request, res: Response, next: NextFunction) {
        let user = req.body;
        if (!user.email || user.email?.lenght === 0) {
            throw new ValidationError("E-mail obrigatório!");
        }
        const result = await getFirestore().collection("users").add(user);

        res.status(201).send({
            message: `User was created! ID: ${result.id}`
        });
    }
}