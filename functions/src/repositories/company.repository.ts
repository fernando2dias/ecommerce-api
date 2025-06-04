import {CollectionReference, getFirestore} from "firebase-admin/firestore";
import {Company, companyConverter} from "../models/company.model.js";

export class CompanyRepository {
  private collection: CollectionReference<Company>;

  constructor() {
    this.collection = getFirestore().collection("companies").withConverter(companyConverter);
  }
  async getAll(): Promise<Company[]> {
    const snapshot = await this.collection.get();
    return snapshot.docs.map(doc => doc.data());
  }

  async getById(id: string): Promise<Company | null> {
    const doc = await this.collection.doc(id).get();
    return doc.data() ?? null;
  }

  async save(company: Company): Promise<string> {
    const companySaved = await this.collection.add(company);
    return companySaved.id;
  }

  async update(company: Company): Promise<void> {
    await this.collection
      .doc(company.id)
      .set(company);
  }

  async delete(id: string): Promise<void> {
    await this.collection.doc(id).delete();
  }
}
