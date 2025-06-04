import {Joi} from "celebrate";
import {DocumentData, FirestoreDataConverter, QueryDocumentSnapshot} from "firebase-admin/firestore";

export class User {
  id: string;
  name: string;
  email: string;
  age: number;
  password?: string;

  constructor(data: User | any) {
    this.id = data.id;
    this.name = data.name;
    this.email = data.email;
    this.age = data.age;
    this.password = data.password;
  }
}

export const newUserSchema = Joi.object().keys({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  age: Joi.number().required(),
  password: Joi.string().min(6).required(),
});

export const updateUserSchema = Joi.object().keys({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  age: Joi.number().required(),
  password: Joi.string().min(6),
});

export const authLoginSchema = Joi.object().keys({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

export const authRecoverySchema = Joi.object().keys({
  email: Joi.string().email().required(),
});

export const userConverter: FirestoreDataConverter<User> = {
  toFirestore: (user: User): DocumentData => {
    return {
      name: user.name,
      email: user.email,
      age: user.age,
    };
  },
  fromFirestore: (snapshot: QueryDocumentSnapshot): User => {
    return new User({
      id: snapshot.id,
      ...snapshot.data(),
    });
  },
};
