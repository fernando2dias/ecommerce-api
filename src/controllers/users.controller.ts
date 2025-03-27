import { Request, Response } from "express";
import { User } from "../models/user.model";
import { UserService } from "../services/user.services";

export class UsersController {

    static async getAll(req: Request, res: Response) {
        //console.log(`Get All -> UserId: ${req.user.id}`);
        res.send(await new UserService().getAll());
    }

    static async getById(req: Request, res: Response) {
        res.send(await new UserService().getById(req.params.id));
    }

    static async delete(req: Request, res: Response) {
        await new UserService().delete(req.params.id);
        res.status(204).end();
    }

    static async update(req: Request, res: Response) {
        let user = req.body as User;
        user.id = req.params.id;

        await new UserService().update(user)

        res.send({ message: "User updated successfully" });
    }

    static async save(req: Request, res: Response) {
        let user = req.body as User;
        let savedUserId = await new UserService().save(user)

        res.status(201).send({
            messaage: `User ${savedUserId} was created!`
        });
    }
}