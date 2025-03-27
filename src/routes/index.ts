import express from 'express';
import { userRouters } from './users.route.js';
import { authRoutes } from './auth.route.js';
import { companyRouters } from './companies.route.js';

export const routes = (app: express.Express) => {
    app.use(express.json({limit: "5mb"}));
    app.use(authRoutes);
    app.use(userRouters);
    app.use(companyRouters);
}