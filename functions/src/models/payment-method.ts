import {Joi} from "celebrate";
import {DocumentData, FirestoreDataConverter, QueryDocumentSnapshot} from "firebase-admin/firestore";

export class PaymentMethod {
  id: string;
  description: string;
  active: boolean;

  constructor(data: PaymentMethod | any) {
    this.id = data.id;
    this.description = data.description;
    this.active = data.active ?? true;
  }
}

export const newPaymentSchema = Joi.object().keys({
  description: Joi.string().min(3).required(),
  active: Joi.boolean().only().allow(true).default(true),
});

export const updatePaymentSchema = Joi.object().keys({
  description: Joi.string().min(3).required(),
  active: Joi.boolean().required(),
});

export const paymentMethodConverter: FirestoreDataConverter<PaymentMethod> = {
  toFirestore: (paymentMethod: PaymentMethod ): DocumentData => {
    return {
      description: paymentMethod.description,
      active: paymentMethod.active,
    };
  },
  fromFirestore: (snapshot: QueryDocumentSnapshot): PaymentMethod => {
    return new PaymentMethod({
      id: snapshot.id,
      ...snapshot.data(),
    });
  },
};
