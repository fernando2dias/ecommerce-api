import express from "express";
import asyncHandler from "express-async-handler"
import { celebrate, Segments } from "celebrate";
import { CompaniesController } from "../controllers/companies.controller.js";
import { CompanySchema as CompanySchema, CompanySchemaUpdate } from "../models/company.model.js";

export const companyRouters = express.Router();

companyRouters.get("/companies", asyncHandler(CompaniesController.getAll));
companyRouters.get("/companies/:id", asyncHandler(CompaniesController.getById));
companyRouters.put("/companies/:id", celebrate({[Segments.BODY]: CompanySchemaUpdate}), asyncHandler(CompaniesController.update));
companyRouters.post("/companies", celebrate({[Segments.BODY]: CompanySchema}), asyncHandler(CompaniesController.save));