import {CollectionReference, getFirestore} from "firebase-admin/firestore";
import {Order, orderConverter, OrderStatus, QueryParamsOrder} from "../models/order.model.js";
import dayjs from "dayjs";
import {OrderItem, orderItemConverter} from "../models/ordem-item.model.js";
import {NotFoundError} from "../errors/not-found.error.js";

export class OrderRepository {
  private collection: CollectionReference<Order>;

  constructor() {
    this.collection = getFirestore().collection("orders").withConverter(orderConverter);
  }

  async save(order: Order) {
    const batch = getFirestore().batch();
    const orderRef = await this.collection.doc();
    batch.create(orderRef, order);

    const itemsRef = orderRef.collection("items").withConverter(orderItemConverter);
    for (const item of order.items!) {
      batch.create(itemsRef.doc(), item);
    }
    await batch.commit();
  }

  async search(queryParams: QueryParamsOrder): Promise<Order[]> {
    let query: FirebaseFirestore.Query<Order> = this.collection;

    if (queryParams.companyId) {
      query = query.where("company.id", "==", queryParams.companyId);
    }


    if (queryParams.beginDate) {
      queryParams.beginDate = dayjs(queryParams.beginDate).add(1, "day").hour(-3).minute(0).second(0).millisecond(0).toDate();
      query = query.where("date", ">=", new Date(queryParams.beginDate));
    }

    if (queryParams.endDate) {
      queryParams.endDate = dayjs(queryParams.endDate).add(1, "day").hour(20).minute(59).second(59).millisecond(999).toDate();
      query = query.where("date", "<=", new Date(queryParams.endDate));
    }

    if (queryParams.status) {
      query = query.where("status", "==", queryParams.status);
    }


    const snapshot = await query.get();

    return snapshot.docs.map(doc => doc.data());
  }

  async getItems(orderId: string): Promise<OrderItem[]> {
    const orderRef = await this.collection.doc(orderId);
    const snapshot = await orderRef.collection("items").withConverter(orderItemConverter).get();
    return snapshot.docs.map(doc => doc.data());
  }

  async getById(orderId: string): Promise<Order> {
    const order = (await this.collection.doc(orderId).get()).data();

    if (!order) {
      throw new NotFoundError("Order not found");
    }

    order.items = await this.getItems(orderId);
    return order;
  }

  async changeStatus(orderId: string, status: OrderStatus) {
    this.collection
      .withConverter(null)
      .doc(orderId)
      .set({status: status}, {merge: true});
  }
}
