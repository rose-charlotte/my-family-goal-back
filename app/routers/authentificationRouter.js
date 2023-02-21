import express from "express";
const authentificationRouter = express.Router();
import { authentificationController } from "../controllers/index.js";

authentificationRouter.get('/signin', authentificationController.signin);

export {authentificationRouter};