import { NotFoundError } from "../errors/not-found.error.js";
import { Company } from "../models/company.model.js";
import { CompanyRepository } from "../repositories/company.repository.js";
import { UploadFileService } from "./upload-file.service.js";

export class CompanyService {
    private companyRepository: CompanyRepository;
    private uploadFileService: UploadFileService;

    constructor() {
        this.companyRepository = new CompanyRepository();
        this.uploadFileService = new UploadFileService("images/companies/");
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
        const brandUrl = await this.uploadFileService.upload(company.brand);
        company.brand = brandUrl;
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