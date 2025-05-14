import { CollectionReference, getFirestore } from "firebase-admin/firestore";
import { Order, QueryParamsOrder } from "../models/order.model.js";
import dayjs from "dayjs";

export class OrderRepository {
    private collection: CollectionReference;

    constructor() {
        this.collection = getFirestore().collection("orders");
    }

    async save(order: Order) {
        await this.collection.add(order);
    }

    async search(queryParams: QueryParamsOrder): Promise<Order[]> {
        let query: FirebaseFirestore.Query = this.collection;

        if(queryParams.companyId) {
          query = query.where("company.id", "==", queryParams.companyId);
        }

        
        if(queryParams.beginDate) {
            queryParams.beginDate = dayjs(queryParams.beginDate).add(1,'day').hour(-3).minute(0).second(0).millisecond(0).toDate();
            query = query.where("date", ">=", new Date(queryParams.beginDate));
            

        }

        if(queryParams.endDate) {
            queryParams.endDate = dayjs(queryParams.endDate).add(1, 'day').hour(20).minute(59).second(59).millisecond(999).toDate();
            query = query.where("date", "<=", new Date(queryParams.endDate));
        }

        if(queryParams.status){
            query = query.where("status", "==", queryParams.status);
        }

    

        const snapshot = await query.get();

        return snapshot.docs.map((doc) => {
            return new Order({
                id: doc.id,
                ...doc.data()
            }); 
        });
    }
}