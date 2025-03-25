import express from "express";
import asyncHandler from "express-async-handler"
import { celebrate, Segments } from "celebrate";
import { CompaniesController } from "../controllers/companies.controller";
import { newCompanySchema } from "../models/company.model";

export const companyRouters = express.Router();

companyRouters.get("/companies", asyncHandler(CompaniesController.getAll));
companyRouters.get("/companies/:id", asyncHandler(CompaniesController.getById));
companyRouters.put("/companies/:id", celebrate({[Segments.BODY]: newCompanySchema}), asyncHandler(CompaniesController.update));
companyRouters.post("/companies", celebrate({[Segments.BODY]: newCompanySchema}), asyncHandler(CompaniesController.save));