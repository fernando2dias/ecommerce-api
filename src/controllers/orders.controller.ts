import {Request, Response} from "express"
import { OrderService } from "../services/order.service.js";
import { Order, QueryParamsOrder } from "../models/order.model.js";
 
export class OrdersController {
    static async save(req: Request, res: Response){
        const order = new Order(req.body);
        await new OrderService().save(order);
        res.status(201).json({
            message: "Order created successfully",
    });
    }

    static async search(req: Request, res: Response){
       const orders = await new OrderService().search(req.query as QueryParamsOrder)
        res.send(orders);
    }

    static async getItems(req: Request, res: Response) {
        const items = await new OrderService().getItems(req.params.id);
        res.send(items);
    }

    static async getById(req: Request, res: Response) {
        const order = await new OrderService().getById(req.params.id);
        res.send(order);
    }

    static async changeStatus(req: Request, res: Response) {
        const orderId = req.params.id;
        const status = req.body.status;
        await new OrderService().changeStatus(orderId, status);
        res.status(204).end();
    }
}