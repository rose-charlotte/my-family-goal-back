import express from "express";
const rewardRouter = express.Router();
import { rewardController } from "../controllers/index.js";

// CRUD reward
rewardRouter.post('/family/:id/reward', rewardController.create);
rewardRouter.patch('/reward/:id', rewardController.update);
rewardRouter.delete('/reward/:id', rewardController.delete);

// PURCHASE reward
rewardRouter.patch('/reward/:rewardId/user/:userId', rewardController.purchase);

export {rewardRouter};