import {Request, Response} from "express";
import {PaymentMethodService} from "../services/payment-method.service.js";
import {PaymentMethod} from "../models/payment-method.js";

export class PaymentMethodController {
  static async getAll(req: Request, res: Response) {
    res.send(await new PaymentMethodService().getAll());
  }

  static async getById(req: Request, res: Response) {
    res.send(await new PaymentMethodService().getById(req.params.id));
  }

  static async update(req: Request, res: Response) {
    const paymentMethod = req.body as PaymentMethod;
    paymentMethod.id = req.params.id;
    await new PaymentMethodService().update(paymentMethod);

    res.send({message: "Payment Method updated successfully"});
  }

  static async save(req: Request, res: Response) {
    const paymentMethod = req.body as PaymentMethod;
    const savedPaymentMethodId = await new PaymentMethodService().save(paymentMethod);

    res.status(201).send({
      message: `Category ${savedPaymentMethodId} was created!`,
    });
  }

  static async delete(req: Request, res: Response) {
    await new PaymentMethodService().delete(req.params.id);
    res.status(204).end();
  }
}
