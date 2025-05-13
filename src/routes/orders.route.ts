import { celebrate, Segments } from "celebrate";
import { Router } from "express";
import { newOrderSchema, searchParamsOrderQuerySchema } from "../models/order.model.js";
import expressAsyncHandler from "express-async-handler";
import { OrdersController } from "../controllers/orders.controller.js";

export const ordersRoutes = Router();
ordersRoutes.post("/orders", celebrate({[Segments.BODY]: newOrderSchema}), expressAsyncHandler(OrdersController.save))
ordersRoutes.get("/orders", celebrate({[Segments.QUERY]: searchParamsOrderQuerySchema}), expressAsyncHandler(OrdersController.search));