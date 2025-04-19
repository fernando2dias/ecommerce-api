import { Router } from "express";
import asyncHandler from "express-async-handler"
import { celebrate, Segments } from "celebrate";
import { newProductSchema, searchQuerySchema, updateProductSchema } from "../models/product.model.js"
import { ProductsController } from "../controllers/products.controller.js";

export const productRoutes = Router();

productRoutes.get("/products", asyncHandler(ProductsController.getAll));
productRoutes.get("/products/search", celebrate({[Segments.QUERY]:searchQuerySchema}),(ProductsController.search));
productRoutes.get("/products/:id", asyncHandler(ProductsController.getById));
productRoutes.put("/products/:id", celebrate({[Segments.BODY]: updateProductSchema}), asyncHandler(ProductsController.update));
productRoutes.post("/products", celebrate({[Segments.BODY]: newProductSchema}), asyncHandler(ProductsController.save));
productRoutes.delete("/products/:id", asyncHandler(ProductsController.delete));
