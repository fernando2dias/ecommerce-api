import {Router} from "express";
import asyncHandler from "express-async-handler";
import {celebrate, Segments} from "celebrate";
import {PaymentMethodController} from "../controllers/payment-method.controller.js";
import {newPaymentSchema, updatePaymentSchema} from "../models/payment-method.js";

export const paymentMethodRoutes = Router();

paymentMethodRoutes.get("/payment-methods", asyncHandler(PaymentMethodController.getAll));
paymentMethodRoutes.get("/payment-methods/:id", asyncHandler(PaymentMethodController.getById));
paymentMethodRoutes.put("/payment-methods/:id", celebrate({[Segments.BODY]: updatePaymentSchema}), asyncHandler(PaymentMethodController.update));
paymentMethodRoutes.post("/payment-methods", celebrate({[Segments.BODY]: newPaymentSchema}), asyncHandler(PaymentMethodController.save));
paymentMethodRoutes.delete("/payment-methods/:id", asyncHandler(PaymentMethodController.delete));
