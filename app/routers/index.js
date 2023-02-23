import express from "express";
const router = express.Router();

// mainRouter
import { mainRouter } from "./mainRouter.js";
router.use(mainRouter);

// userRouter
import { userRouter } from "./userRouter.js";
router.use(userRouter);

// family
import { familyRouter } from "./familyRouter.js";
router.use(familyRouter);

// reward
import { rewardRouter } from "./rewardRouter.js";
router.use(rewardRouter);

// 404
router.use('/', (req, res) => {
    res.status(404).json('error 404 - Page not found');
})

export {router};