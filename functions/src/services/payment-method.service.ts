import {NotFoundError} from "../errors/not-found.error.js";
import {PaymentMethod} from "../models/payment-method.js";
import {PaymentMethodRepository} from "../repositories/payment-method.repository.js";

export class PaymentMethodService {
  private paymentMethodRepository: PaymentMethodRepository;

  constructor() {
    this.paymentMethodRepository = new PaymentMethodRepository();
  }

  async getAll(): Promise<PaymentMethod[]> {
    return this.paymentMethodRepository.getAll();
  }

  async getById(id: string): Promise<PaymentMethod> {
    const paymentMethod = await this.paymentMethodRepository.getById(id);

    if (!paymentMethod) {
      throw new NotFoundError("Payment method is not found!");
    }

    return paymentMethod;
  }

  async save(paymentMethod: PaymentMethod): Promise<string> {
    await this.paymentMethodRepository.save(paymentMethod);

    return paymentMethod.description;
  }

  async update(paymentMethod: PaymentMethod): Promise<void> {
    let _paymentMehotd = await this.getById(paymentMethod.id);

    _paymentMehotd = paymentMethod;
    await this.paymentMethodRepository.update(_paymentMehotd);
  }

  async delete(id: string): Promise<void> {
    await this.paymentMethodRepository.delete(id);
  }
}
