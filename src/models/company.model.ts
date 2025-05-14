import { Joi } from "celebrate";
import { phoneRegexPattern } from "../utils/regex-utils.js";
import { DocumentData, FirestoreDataConverter, QueryDocumentSnapshot } from "firebase-admin/firestore";

export class Company {
    id: string;
    brand: string;
    document: string;
    companyName: string;
    phone: string;
    openingHours: string;
    address: string;
    location: string;
    deliveryTax: number;
    active: boolean;

    constructor(data: Company | any) {
        this.id = data.id;
        this.brand = data.brand;
        this.document = data.document;
        this.companyName = data.companyName;
        this.phone = data.phone;
        this.openingHours = data.openingHours;
        this.address = data.address;
        this.location = data.location;
        this.deliveryTax = data.deliveryTax;
        this.active = data.active ?? true;
    }
}

export const CompanySchema = Joi.object().keys({
    brand: Joi.string().base64().required(),
    document: Joi.alternatives().try(
        Joi.string().length(11).required(),
        Joi.string().length(14).required()
    ).required(),
    companyName: Joi.string().required(),
    phone: Joi.string().regex(phoneRegexPattern).required(),
    openingHours: Joi.string().required(),
    address: Joi.string().required(),
    location: Joi.string().required(),
    deliveryTax: Joi.number().required(),
    active: Joi.boolean().only().allow(true).default(true)
});

export const CompanySchemaUpdate = Joi.object().keys({
    brand: Joi.alternatives().try(
        Joi.string().base64().required(),
        Joi.string().uri().required()
    ).required(),
    document: Joi.alternatives().try(
        Joi.string().length(11).required(),
        Joi.string().length(14).required()
    ).required(),
    companyName: Joi.string().required(),
    phone: Joi.string().regex(phoneRegexPattern).required(),
    openingHours: Joi.string().required(),
    address: Joi.string().required(),
    location: Joi.string().required(),
    deliveryTax: Joi.number().required(),
    active: Joi.boolean().default(true)
});

export const companyConverter: FirestoreDataConverter<Company> = {
    toFirestore: (company: Company): DocumentData => {
        return {
            brand: company.brand,
            document: company.document,
            companyName: company.companyName,
            phone: company.phone,
            openingHours: company.openingHours,
            address: company.address,
            location: company.location,
            deliveryTax: company.deliveryTax,
            active: company.active
        };
    },
    fromFirestore: (snapshot: QueryDocumentSnapshot): Company => {
        return new Company({
            id: snapshot.id,
            ...snapshot.data()
        });
    }
};
