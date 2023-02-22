import express from "express";
const userRouter = express.Router();
import { userController } from "../controllers/index.js";

userRouter.post('/signin', userController.signin);
userRouter.post('/signup', userController.signup);

export {userRouter};