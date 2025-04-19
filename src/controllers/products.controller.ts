import { Request, Response } from "express";
import { ProductService } from "../services/product.services.js";
import { Product } from "../models/product.model.js";

export class ProductsController {

    static async getAll(req: Request, res: Response) {
        //console.log(`Get All -> UserId: ${req.user.id}`);
        res.send(await new ProductService().getAll());
    }

    static async search(req: Request, res:Response){
       const categoryId = req.query.categoryId as string;
       res.send(await new ProductService().search(categoryId));
    }

    static async getById(req: Request, res: Response) {
        res.send(await new ProductService().getById(req.params.id));
    }

    static async update(req: Request, res: Response) {
        let product = req.body as Product;
        product.id = req.params.id;

        await new ProductService().update(product)

        res.send({ message: "Product updated successfully" });
    }

    static async save(req: Request, res: Response) {
        let product = req.body as Product;
        let savedProductId = await new ProductService().save(product)

        res.status(201).send({
            message: `Product ${savedProductId} was created!`
        });
    }

    static async delete(req: Request, res: Response) {
            await new ProductService().delete(req.params.id);
            res.status(204).end();
        }
}