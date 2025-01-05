import { Request, Response } from "express";
import { getFirestore } from "firebase-admin/firestore";

interface User {
    id: number; 
    name: string;
    email: string;
}

let users: User[] = [];

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

    static getById(req: Request, res: Response){
        let userId = Number(req.params.id);
        let user = users.find(user => user.id === userId);
        res.send(user);
    };

    static delete(req: Request, res: Response){
        let userId = Number(req.params.id);
        let userIndex = users.findIndex((user) => user.id === userId);
    
        if (userIndex === -1) {
            res.status(404).send({ message: "User not found" });
        }
    
        users.splice(userIndex, 1);
    
        res.send({
            message: "User was deleted!"
        });
    }

    static update(req: Request, res: Response){
        let userId = Number(req.params.id);
        let userEdited = req.body;
        let userIndex = users.findIndex((user) => user.id === userId);
    
        if (userIndex === -1) {
            res.status(404).send({ message: "User not found" });
        }
    
        users[userIndex] = {
             id: userId,
             name: userEdited.name,
             email: userEdited.email,
        };
    
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