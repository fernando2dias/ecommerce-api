import {NotFoundError} from "../errors/not-found.error.js";
import {ValidationError} from "../errors/validation.error.js";
import {Category} from "../models/category.model.js";
import {CategoryRepository} from "../repositories/category.repository.js";
import {ProductRepository} from "../repositories/product.repository.js";

export class CategoryService {
  private categoryRepository: CategoryRepository;
  private productRepository: ProductRepository;

  constructor() {
    this.categoryRepository = new CategoryRepository();
    this.productRepository = new ProductRepository();
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
    if (await this.productRepository.getCountCategory(id) > 0) {
      throw new ValidationError("Is not possible, there product with this category.");
    }
    await this.categoryRepository.delete(id);
  }
}
