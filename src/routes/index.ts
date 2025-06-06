import express from 'express';
import { userRoutes } from './users.route.js';
import { authRoutes } from './auth.route.js';
import { companyRoutes } from './companies.route.js';
import { categoryRoutes } from './categories.route.js';
import { productRoutes } from './products.route.js';
import { paymentMethodRoutes } from './payment-method.route.js';
import { ordersRoutes } from './orders.route.js';
import { allowAnonymousUser } from '../middlewares/allow-anonymous-user.middleware.js';

export const routes = (app: express.Express) => {
    app.use(express.json({limit: "5mb"}));
    app.use(authRoutes);
    app.use(allowAnonymousUser)
    app.use(userRoutes);
    app.use(companyRoutes);
    app.use(categoryRoutes);
    app.use(productRoutes);
    app.use(paymentMethodRoutes)
    app.use(ordersRoutes);
}