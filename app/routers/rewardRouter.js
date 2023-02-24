import express from "express";
const rewardRouter = express.Router();
import { rewardController } from "../controllers/index.js";

rewardRouter.post('/family/:id/reward', rewardController.create);
rewardRouter.patch('/reward/:id', rewardController.update);
rewardRouter.delete('/reward/:id', rewardController.delete);
rewardRouter.patch('/reward/:rewardId/user/:userId', rewardController.purchase);

export {rewardRouter};