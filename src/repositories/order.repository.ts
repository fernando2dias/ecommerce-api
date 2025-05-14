import { CollectionReference, getFirestore } from "firebase-admin/firestore";
import { Order, QueryParamsOrder } from "../models/order.model.js";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc.js";
import timezone from 'dayjs/plugin/timezone.js';

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

        
        dayjs.extend(utc);
        dayjs.extend(timezone);
        const tz = "America/Sao_Paulo";
        dayjs.tz.setDefault("America/Sao_Paulo");


        if(queryParams.beginDate) {
            console.log("queryParams.beginDate", queryParams.beginDate);
            queryParams.beginDate = dayjs(queryParams.beginDate).add(1,'day').startOf('day').toDate();
            queryParams.beginDate = dayjs.tz(queryParams.beginDate).tz(tz, true).toDate();
            console.log("queryParams.beginDate", queryParams.beginDate);
            query = query.where("date", ">=", new Date(queryParams.beginDate));
            

        }

        if(queryParams.endDate) {
            console.log("queryParams.endDate", queryParams.endDate);
            queryParams.endDate = dayjs.tz(queryParams.endDate).add(1, 'day').endOf('day').toDate();
            console.log("queryParams.endDate", queryParams.endDate);
            query = query.where("date", "<=", new Date(queryParams.endDate));
        }

        if(queryParams.status){
            query = query.where("status", "==", queryParams.status);
        }

    

        const snapshot = await query.get();

        return snapshot.docs.map((doc) => {
            return {
                id: doc.id,
                ...doc.data()
            } as unknown;
        }) as Order[];
    }
}