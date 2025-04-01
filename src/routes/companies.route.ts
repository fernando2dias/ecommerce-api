import express from "express";
import asyncHandler from "express-async-handler"
import { celebrate, Segments } from "celebrate";
import { CompaniesController } from "../controllers/companies.controller.js";
import { CompanySchema as CompanySchema, CompanySchemaUpdate } from "../models/company.model.js";

export const companyRoutes = express.Router();

companyRoutes.get("/companies", asyncHandler(CompaniesController.getAll));
companyRoutes.get("/companies/:id", asyncHandler(CompaniesController.getById));
companyRoutes.put("/companies/:id", celebrate({[Segments.BODY]: CompanySchemaUpdate}), asyncHandler(CompaniesController.update));
companyRoutes.post("/companies", celebrate({[Segments.BODY]: CompanySchema}), asyncHandler(CompaniesController.save));