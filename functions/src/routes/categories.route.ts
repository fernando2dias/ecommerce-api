import {Router} from "express";
import asyncHandler from "express-async-handler";
import {celebrate, Segments} from "celebrate";
import {CategoriesController} from "../controllers/categories.controller.js";
import {CategorySchema, CategorySchemaUpdate} from "../models/category.model.js";

export const categoryRoutes = Router();

categoryRoutes.get("/categories", asyncHandler(CategoriesController.getAll));
categoryRoutes.get("/categories/:id", asyncHandler(CategoriesController.getById));
categoryRoutes.put("/categories/:id", celebrate({[Segments.BODY]: CategorySchemaUpdate}), asyncHandler(CategoriesController.update));
categoryRoutes.post("/categories", celebrate({[Segments.BODY]: CategorySchema}), asyncHandler(CategoriesController.save));
categoryRoutes.delete("/categories/:id", asyncHandler(CategoriesController.delete));
