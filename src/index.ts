import express from "express";

const app = express();

app.get('/', (req, res) =>{
    res.send("Welcome, Hello World");
});

app.listen(3000, ()=>{
    console.log("Server is active at port 3000");
});