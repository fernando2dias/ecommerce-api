import express from "express";
import { UsersController } from "../controllers/users.controller";
import asyncHandler from "express-async-handler"

export const userRouters = express.Router();

userRouters.get("/users", asyncHandler(UsersController.getAll));
userRouters.get("/users/:id", asyncHandler(UsersController.getById));
userRouters.delete("/users/:id", asyncHandler(UsersController.delete));
userRouters.put("/users/:id", asyncHandler(UsersController.update));
userRouters.post("/users", asyncHandler(UsersController.save));