import express from "express";
import { UsersController } from "../controllers/users.controller";

export const userRouters = express.Router();

userRouters.get("/users", UsersController.getAll);
userRouters.get("/users/:id", UsersController.getById);
userRouters.delete("/users/:id", UsersController.delete);
userRouters.put("/users/:id", UsersController.update);
userRouters.post("/users", UsersController.save);