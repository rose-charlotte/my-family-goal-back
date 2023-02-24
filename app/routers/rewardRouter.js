import express from "express";
const rewardRouter = express.Router();
import { rewardController } from "../controllers/index.js";

rewardRouter.post('/family/:id/reward', rewardController.create);

export {rewardRouter};