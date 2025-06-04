import {Request, Response} from "express";
import {Company} from "../models/company.model.js";
import {CompanyService} from "../services/company.services.js";

export class CompaniesController {
  static async getAll(req: Request, res: Response) {
    // console.log(`Get All -> UserId: ${req.user.id}`);
    res.send(await new CompanyService().getAll());
  }

  static async getById(req: Request, res: Response) {
    res.send(await new CompanyService().getById(req.params.id));
  }

  static async update(req: Request, res: Response) {
    const company = req.body as Company;
    company.id = req.params.id;

    await new CompanyService().update(company);

    res.send({message: "Company updated successfully"});
  }

  static async save(req: Request, res: Response) {
    const company = req.body as Company;
    const savedCompanyId = await new CompanyService().save(company);

    res.status(201).send({
      message: `Company ${savedCompanyId} was created!`,
    });
  }
}
