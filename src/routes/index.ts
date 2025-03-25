import express from 'express';
import { userRouters } from './users.route';
import { authRoutes } from './auth.route';
import { companyRouters } from './companies.route';

export const routes = (app: express.Express) => {
    app.use(express.json());
    app.use(authRoutes);
    app.use(userRouters);
    app.use(companyRouters);
}