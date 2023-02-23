import "dotenv/config";

// Create app express
import express from "express";
const app = express();

// Config cors
import cors from "cors";
app.use(cors());

// Config json & urlencoded
app.use(express.json());
app.use(express.urlencoded({extended : true}));

// Router
import { router } from "./app/routers/index.js";
app.use(router);

// launch server
const PORT = process.env.PORT ?? 3000;
app.listen(PORT, ()=>{
    console.log(`Server launched on : http://localhost:${PORT}`);
});