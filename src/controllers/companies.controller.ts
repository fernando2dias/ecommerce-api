import { NextFunction, Request, Response } from "express";
import { Company } from "../models/company.model";
import { CompanyService } from "../services/company.services";

export class CompaniesController {

    static async getAll(req: Request, res: Response, next: NextFunction) {
        //console.log(`Get All -> UserId: ${req.user.id}`);
        res.send(await new CompanyService().getAll());
    }

    static async getById(req: Request, res: Response, next: NextFunction) {
        res.send(await new CompanyService().getById(req.params.id));
    }

    static async update(req: Request, res: Response, next: NextFunction) {
        let company = req.body as Company;
        company.id = req.params.id;

        await new CompanyService().update(company)

        res.send({ message: "Company updated successfully" });
    }

    static async save(req: Request, res: Response, next: NextFunction) {
        let company = req.body as Company;
        let savedCompanyId = await new CompanyService().save(company)

        res.status(201).send({
            message: `Company ${savedCompanyId} was created!`
        });
    }
}