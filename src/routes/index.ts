import express from 'express';
import { userRouters } from './users.route';

export const routes = (app: express.Express) => {
    app.use(express.json());
    app.use(userRouters);
}