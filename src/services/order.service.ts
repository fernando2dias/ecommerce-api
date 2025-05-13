import { NotFoundError } from "../errors/not-found.error.js";
import { ValidationError } from "../errors/validation.error.js";
import { Order, QueryParamsOrder } from "../models/order.model.js";
import { CompanyRepository } from "../repositories/company.repository.js";
import { OrderRepository } from "../repositories/order.repository.js";
import { PaymentMethodRepository } from "../repositories/payment-method.repository.js";
import { ProductRepository } from "../repositories/product.repository.js";

export class OrderService {
    private orderRepository: OrderRepository;
    private companyRepository: CompanyRepository;
    private paymentMethodRepository: PaymentMethodRepository;
    private productRepository: ProductRepository;

    constructor() {
        this.orderRepository = new OrderRepository();
        this.companyRepository = new CompanyRepository();
        this.paymentMethodRepository = new PaymentMethodRepository();
        this.productRepository = new ProductRepository();
    }

    async save(order: Order) {
        try {
            const company = await this.companyRepository.getById(order.company.id!);
            
            if (!company) {
                throw new NotFoundError("Company not found");
            }
            order.company = company;

            const paymentMethod = await this.paymentMethodRepository.getById(order.paymentMethod.id!);
            if (!paymentMethod) {
                throw new NotFoundError("Payment method not found");
            }
            order.paymentMethod = paymentMethod;

            for (const item of order.items) {
                const product = await this.productRepository.getById(item.product.id!);
                if (!product) {
                    throw new NotFoundError("Product not found");
                }
                item.product = product;
            }
            order.items = order.items;

            await this.orderRepository.save(order);
        } catch (error) {
            throw new ValidationError(`Order could not be saved: ${error}`);
        }
    }

    async search(query: QueryParamsOrder): Promise<Order[]> {
        return await this.orderRepository.search(query);
    }

}