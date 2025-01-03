import express, {Request, Response} from "express";

const app = express();
app.use(express.json());

let users = [
    {
        name: "Fernando Dias Motta",
        age: 38
    },
    {
        name: "Juliana Michelsen",
        age: 39
    }
];

app.get('/', (req: Request, res: Response) =>{
    res.send("Welcome, Hello World");
});

app.get("/users", (req: Request, res: Response) => {
    res.send(users);
});

app.post("/users", (req: Request, res: Response)=>{
    let user = req.body;
    users.push(user);
    res.send({
    message: "User was created!"
    });
});

app.listen(3000, ()=>{
    console.log("Server is active at port 3000");
});