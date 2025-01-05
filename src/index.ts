import express, { Request, Response } from "express";
import { initializeApp } from 'firebase-admin/app';
import {routes} from './routes/index'
import { errorHandler } from "./middlewares/error-handler.middleware";

initializeApp();
const app = express();

app.get('/', (req: Request, res: Response) => {
    res.send("Welcome, Hello World");
});

routes(app);
errorHandler(app);

app.listen(3000, () => {
    console.log("Server is active at port 3000");
});