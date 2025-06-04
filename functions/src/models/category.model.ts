import {Joi} from "celebrate";
import {DocumentData, FirestoreDataConverter, QueryDocumentSnapshot} from "firebase-admin/firestore";

export class Category {
  id: string;
  description: string;
  active: boolean;

  constructor(data: Category | any = {}) {
    this.id = data.id;
    this.description = data.description;
    this.active = data.active ?? true;
  }
}

export const CategorySchema = Joi.object().keys({
  description: Joi.string().required(),
  active: Joi.boolean().only().allow(true).default(true),
});

export const CategorySchemaUpdate = Joi.object().keys({
  description: Joi.string().required(),
  active: Joi.boolean().only().allow(true).default(true),
});

export const categoryConverter: FirestoreDataConverter<Category> = {
  toFirestore: (category: Category): DocumentData => {
    return {
      description: category.description,
      active: category.active,
    };
  },
  fromFirestore: (snapshot: QueryDocumentSnapshot): Category => {
    return new Category({
      id: snapshot.id,
      ...snapshot.data(),
    });
  },
};
