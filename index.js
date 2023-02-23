import "dotenv/config";

// Create app express
import express from "express";
const app = express();

// Config cors
import cors from "cors";
app.use(cors());

// Config session
// import session from "express-session";
// const sessionConfig = {
//     secret: process.env.SESSION_SECRET,
//     resave: true,
//     saveUninitialized: true,
//     cookie: {
//         secure: process.env.NODE_ENV !== "development",
//         maxAge: (1000*60*60),
//         httpOnly: true
//     }
// };
// app.use(session(sessionConfig));

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