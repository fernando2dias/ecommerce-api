import {Request, Response} from "express"
 
export class OrdersController {
    static save(req: Request, res: Response){
        console.log(req.body);
        res.send(req.body);
    }
}