import { NotFoundError } from "../errors/not-found.error.js";
import { ValidationError } from "../errors/validation.error.js";
import { Product } from "../models/product.model.js";
import { CategoryRepository } from "../repositories/category.repository.js";
import { ProductRepository } from "../repositories/product.repository.js";
import { UploadFileService } from "./upload-file.service.js";

export class ProductService {
    private productRepository: ProductRepository;
    private uploadFileService: UploadFileService;
    private categoryRepository: CategoryRepository;

    constructor() {
        this.productRepository = new ProductRepository();
        this.uploadFileService = new UploadFileService("images/products/");
        this.categoryRepository = new CategoryRepository();
    }

    async getAll(): Promise<Product[]> {
        return this.productRepository.getAll();
    }

    async search(categoryId: string): Promise<Product[]>{

        // if(this.categoryRepository.getById(categoryId)){

        // }

        return this.productRepository.search(categoryId);
    }

    async getById(id: string): Promise<Product> {
        const product = await this.productRepository.getById(id);

        if (!product) {
            throw new NotFoundError("Product is not found!");
        }

        return product;
    }

    async save(product: Product): Promise<string> {

        let _category = await this.getCategory(product.category.id);
        product.category = _category;


        if (product.image !== null) {
            if (!this.isValidUrl(product.image)) {
                product.image = await this.uploadFileService.upload(product.image);
            }
        }

        await this.productRepository.save(product);

        return product.name;
    }

    async update(product: Product): Promise<void> {
        let _product = await this.getById(product.id);

        let _category = await this.getCategory(product.category.id);
        
        
        if (product.image && !this.isValidUrl(product.image)) {
            _product.image = await this.uploadFileService.upload(product.image);
            
        }
        
        _product.name = product.name;
        _product.category = _category;
        _product.description = product.description;
        _product.price = product.price;
        _product.active = product.active;
        
        await this.productRepository.update(_product);
    }

    async delete(id: string): Promise<void> {
        await this.productRepository.delete(id);
    }

    private isValidUrl(urlStr: string): boolean {
        try {
            const url = new URL(urlStr);
            if (url.host !== "firebasestorage.googleapis.com") {
                throw new ValidationError("Source URL is invalid!");
            }

            return true;
        }
        catch (error) {
            if (error instanceof ValidationError) {
                throw error;
            }
            return false;
        }
    }

    private async getCategory(id: string) {

        const category = await this.categoryRepository.getById(id);
        if (!category) {
            throw new ValidationError("Category is invalid!");
        }
        return category;        
    }

}