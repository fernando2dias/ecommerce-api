import { NotFoundError } from "../errors/not-found.error.js";
import { Category } from "../models/category.model.js";
import { CategoryRepository } from "../repositories/category.repository.js";

export class CategoryService {
    private categoryRepository: CategoryRepository;

    constructor() {
        this.categoryRepository = new CategoryRepository();
    }

    async getAll(): Promise<Category[]> {
        return this.categoryRepository.getAll();
    }

    async getById(id: string): Promise<Category> {
        const category = await this.categoryRepository.getById(id);

        if (!category) {
            throw new NotFoundError("Category is not found!");
        }

        return category;
    }

    async save(category: Category): Promise<string> {
        await this.categoryRepository.save(category);

        return category.description;
    }

    async update(category: Category): Promise<void> {
        let _category = await this.getById(category.id);

        _category = category;
        await this.categoryRepository.update(_category);
    }

    async delete(id: string): Promise<void> {
        await this.categoryRepository.delete(id);
    }

}