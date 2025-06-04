import {NotFoundError} from "../errors/not-found.error.js";
import {ValidationError} from "../errors/validation.error.js";
import {Company} from "../models/company.model.js";
import {CompanyRepository} from "../repositories/company.repository.js";
import {UploadFileService} from "./upload-file.service.js";

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
    const _company = await this.getById(company.id);

    if (!this.isValidUrl(company.brand)) {
      _company.brand = await this.uploadFileService.upload(company.brand);
    }

    _company.document = company.document;
    _company.companyName = company.companyName;
    _company.phone = company.phone;
    _company.openingHours = company.openingHours;
    _company.address = company.address;
    _company.location = company.location;
    _company.deliveryTax = company.deliveryTax;
    _company.active = company.active;

    await this.companyRepository.update(_company);
  }

  private isValidUrl(urlStr: string): boolean {
    try {
      const url = new URL(urlStr);
      if (url.host !== "firebasestorage.googleapis.com") {
        throw new ValidationError("Source URL is invalid!");
      }

      return true;
    } catch (error) {
      if (error instanceof ValidationError) {
        throw error;
      }
      return false;
    }
  }
}
