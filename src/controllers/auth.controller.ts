import { Request, Response } from "express";
import { AuthService } from "../services/auth.service.js";

export class AuthController {
    static async login(req: Request, res: Response) {
        const { email, password } = req.body;
        const userRecord = await new AuthService().login(email, password);
        const token = await userRecord.user.getIdToken(true);

        res.send({
            token: token
        });
    }

    static async recovery(req: Request, res: Response) {
        const { email } = req.body;
        await new AuthService().recovery(email);
        
        res.end();
    }

    static async signin(req: Request, res: Response) {
        const userRecord = await new AuthService().signin();
        const token = await userRecord.user.getIdToken(true);
        res.send({
            token: token
        });
    }
}