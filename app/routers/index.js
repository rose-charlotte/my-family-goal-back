import express from "express";
const router = express.Router();

// mainRouter
import { mainRouter } from "./mainRouter.js";
router.use(mainRouter);

// authentificationRouter
import { authentificationRouter } from "./authentificationRouter.js";
router.use(authentificationRouter);

export {router};