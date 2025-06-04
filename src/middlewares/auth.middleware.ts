import express, {Request, Response, NextFunction} from "express";
import { UnauthorizedError } from "../errors/unauthorized.error.js";
import { DecodedIdToken, getAuth } from "firebase-admin/auth";
import { UserService } from "../services/user.services.js";
import { ForbiddenError } from "../errors/forbidden.error.js";
import { NotFoundError } from "../errors/not-found.error.js";

export const auth = (app: express.Express) => {
    app.use(async (req: Request, res: Response, next: NextFunction) =>{

        if(isRoutePublic(req)) {
            return next();
        }

        const token = req.headers.authorization?.split("Bearer ")[1];

        if(token) {
            try{
                const decodeIdToken: DecodedIdToken = await getAuth().verifyIdToken(token, true)
                
                if(decodeIdToken.firebase.sign_in_provider === "anonymous") {
                    return next();
                }
                
                req.user = await new UserService().getById(decodeIdToken.uid);

                return next();
            } catch(error) {
                if (error instanceof NotFoundError){
                    return next(new ForbiddenError());  
                }else{
                next(new UnauthorizedError());
                }
            }
        }

        next(new UnauthorizedError());
    });

    const publicRoutesList: string[] = [
        "/auth/login",
        "/auth/recovery",
        "/auth/signin"
    ];

    const isRoutePublic = (req: Request): boolean => {
        return req.method === "POST" && publicRoutesList.some(route => req.url.startsWith(route));
    };
}