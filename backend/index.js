import express from "express";
import cors from "cors";
import TodolistRoute from "./routes/TodolistRoute.js"

const app = express();
app.use(cors());
app.use(express.json());
app.use(TodolistRoute);

app.listen(5000, ()=>console.log('~ ~ Server up and running.... ~ ~'));    