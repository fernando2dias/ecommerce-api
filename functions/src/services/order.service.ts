import {NotFoundError} from "../errors/not-found.error.js";
import {ValidationError} from "../errors/validation.error.js";
import {OrderItem} from "../models/ordem-item.model.js";
import {Order, OrderStatus, QueryParamsOrder} from "../models/order.model.js";
import {CompanyRepository} from "../repositories/company.repository.js";
import {OrderRepository} from "../repositories/order.repository.js";
import {PaymentMethodRepository} from "../repositories/payment-method.repository.js";
import {ProductRepository} from "../repositories/product.repository.js";

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

      for (const item of order.items!) {
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

  async getItems(orderId: string): Promise<OrderItem[]> {
    const items = await this.orderRepository.getItems(orderId);
    if (!items) {
      throw new NotFoundError("Order not found");
    }
    return items;
  }

  async getById(orderId: string): Promise<Order> {
    const order = await this.orderRepository.getById(orderId);
    if (!order) {
      throw new NotFoundError("Order not found");
    }
    return order;
  }

  async changeStatus(orderId: string, status: OrderStatus) {
    const order = await this.getById(orderId);

    if (!order) {
      throw new NotFoundError("Order not found");
    }
    await this.orderRepository.changeStatus(orderId, status);
    // TODO: criar regras de status depois.
  }
}
