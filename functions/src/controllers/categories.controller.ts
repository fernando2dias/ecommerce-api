import {Request, Response} from "express";
import {Category} from "../models/category.model.js";
import {CategoryService} from "../services/category.services.js";

export class CategoriesController {
  static async getAll(req: Request, res: Response) {
    // console.log(`Get All -> UserId: ${req.user.id}`);
    res.send(await new CategoryService().getAll());
  }

  static async getById(req: Request, res: Response) {
    res.send(await new CategoryService().getById(req.params.id));
  }

  static async update(req: Request, res: Response) {
    const category = req.body as Category;
    category.id = req.params.id;

    await new CategoryService().update(category);

    res.send({message: "Category updated successfully"});
  }

  static async save(req: Request, res: Response) {
    const category = req.body as Category;
    const savedCategoryId = await new CategoryService().save(category);

    res.status(201).send({
      message: `Category ${savedCategoryId} was created!`,
    });
  }

  static async delete(req: Request, res: Response) {
    await new CategoryService().delete(req.params.id);
    res.status(204).end();
  }
}
