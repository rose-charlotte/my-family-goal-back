import express from "express";
const authentificationRouter = express.Router();
import { authentificationController } from "../controllers/index.js";

authentificationRouter.post('/signin', authentificationController.signin);
authentificationRouter.post('/signup', authentificationController.signup);

export {authentificationRouter};