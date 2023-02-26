import express from "express";
const userRouter = express.Router();
import { userController } from "../controllers/index.js";

// Authentification
userRouter.post('/signin', userController.signin);
userRouter.post('/signup', userController.signup);

// CRUD user
userRouter.get('/user/:id', userController.get);
userRouter.patch('/user/:id', userController.update);
userRouter.delete('/user/:id', userController.delete);

export {userRouter};