import express from "express";
import { UsersController } from "../controllers/users.controller.js";
import asyncHandler from "express-async-handler"
import { celebrate, Segments } from "celebrate";
import { newUserSchema, updateUserSchema } from "../models/user.model.js";

export const userRouters = express.Router();

userRouters.get("/users", asyncHandler(UsersController.getAll));
userRouters.get("/users/:id", asyncHandler(UsersController.getById));
userRouters.delete("/users/:id", asyncHandler(UsersController.delete));
userRouters.put("/users/:id", celebrate({[Segments.BODY]: updateUserSchema}), asyncHandler(UsersController.update));
userRouters.post("/users", celebrate({[Segments.BODY]: newUserSchema}), asyncHandler(UsersController.save));