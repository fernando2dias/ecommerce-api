import express, { Request, Response } from "express";
import { initializeApp as initializeAdminApp } from 'firebase-admin/app';
import { initializeApp as initializeFirebaseApp  } from "firebase/app";
import {routes} from './routes/index.js'
import { errorHandler } from "./middlewares/error-handler.middleware.js";
import { pageNotFoundHandler } from "./middlewares/page-not-found.middleware.js";
import { auth } from "./middlewares/auth.middleware.js";
import { onRequest } from "firebase-functions/v1/https";


initializeAdminApp();
initializeFirebaseApp({
    apiKey:  "xxxxxxxx"
    //apiKey:  process.env.API_KEY
});
const app = express();

app.get('/', (req: Request, res: Response) => {
    res.send("Welcome, Hello World");
});

auth(app);
routes(app);
pageNotFoundHandler(app);
errorHandler(app);

export const api = onRequest(app);

// app.listen(3000, () => {
//     console.log("Server is active at port 3000");
// });