import { NotFoundError } from "../errors/not-found.error";
import { Company } from "../models/company.model";
import { CompanyRepository } from "../repositories/company.repository";

export class CompanyService {
    private companyRepository: CompanyRepository;


    constructor() {
        this.companyRepository = new CompanyRepository();
    }

    async getAll(): Promise<Company[]> {
        return this.companyRepository.getAll();
    }

    async getById(id: string): Promise<Company> {
        const company = await this.companyRepository.getById(id);

        if (!company) {
            throw new NotFoundError("Company is not found!");
        }

        return company;
    }

    async save(company: Company): Promise<string> {
        
        await this.companyRepository.save(company);

        return company.companyName;
    }

    async update(company: Company): Promise<void> {
        let _company = await this.companyRepository.getById(company.id);

        if (!_company) {
            throw new NotFoundError("Company is not found!");
        }

        await this.companyRepository.update(company);
    }

}