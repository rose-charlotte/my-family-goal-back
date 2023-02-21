import express from "express";
const router = express.Router();

// mainRouter
import { mainRouter } from "./mainRouter.js";
router.use(mainRouter);

// authentificationRouter
import { authentificationRouter } from "./authentificationRouter.js";
router.use(authentificationRouter);

// 404
router.use('/', (req, res) => {
    res.status(404).json('error 404 - Page not found');
})

export {router};