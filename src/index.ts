import express, { Request, Response } from "express";

const app = express();
app.use(express.json());

let id = 1;
interface User {
    id: number; 
    name: string;
    email: string;
}
let users: User[] = [];

app.get('/', (req: Request, res: Response) => {
    res.send("Welcome, Hello World");
});

app.get("/users", (req: Request, res: Response) => {
    res.send(users);
});

app.get("/users/:id", (req: Request, res: Response) => {
    let userId = Number(req.params.id);
    let user = users.find(user => user.id === userId);
    res.send(user);
});

app.delete("/users/:id", (req: Request, res: Response) => {
    let userId = Number(req.params.id);
    let userIndex = users.findIndex((user) => user.id === userId);

    if (userIndex === -1) {
        res.status(404).send({ message: "User not found" });
    }

    users.splice(userIndex, 1);

    res.send({
        message: "User was deleted!"
    });
});

app.put("/users/:id", (req: Request, res: Response) => {
    let userId = Number(req.params.id);
    let userEdited = req.body;
    let userIndex = users.findIndex((user) => user.id === userId);

    if (userIndex === -1) {
        res.status(404).send({ message: "User not found" });
    }

    users[userIndex] = {
         id: userId,
         name: userEdited.name,
         email: userEdited.email,
    };

    res.send({message: "User updated successfully"});
});

app.post("/users", (req: Request, res: Response) => {
    let user = req.body;
    user.id = id++;
    users.push(user);
    res.send({
        message: "User was created!"
    });
});

app.listen(3000, () => {
    console.log("Server is active at port 3000");
});