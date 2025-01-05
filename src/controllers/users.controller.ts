import { Request, Response } from "express";
import { getFirestore } from "firebase-admin/firestore";

export class UsersController {
    
    static async getAll(req: Request, res: Response){
        const snapshot = await getFirestore().collection("users").get();
        const userss = snapshot.docs.map(doc => {
            return {
                id: doc.id,
                ...doc.data()
            };
        });


        res.send(userss);
    }

    static async getById(req: Request, res: Response){
        let userId = req.params.id;
        const doc = await getFirestore().collection("users").doc(userId).get();
        let user = {
            id: doc.id,
            ...doc.data()
        };
        
        res.send(user);
    };

    static async delete(req: Request, res: Response){
        let userId = req.params.id;
        await getFirestore().collection("users").doc(userId).delete();
    
        res.send({
            message: "User was deleted!"
        });
    }

    static async update(req: Request, res: Response){
        let userId = req.params.id;
        let user = req.body;
        
        await getFirestore().collection("users").doc(userId).set({
            name: user.name,
            email: user.email
        });

        res.send({message: "User updated successfully"});
    }

    static async save(req: Request, res: Response){
        let user = req.body;
        
        const result = await getFirestore().collection("users").add(user);

        res.send({
            message: `User was created! ID: ${result.id}`
        });
    }
}