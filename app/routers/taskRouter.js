import express from "express";
const taskRouter = express.Router();
import { taskController } from "../controllers/index.js";

taskRouter.post('/family/:id/task', taskController.create);
taskRouter.patch('/task/:id', taskController.update);
taskRouter.delete('/task/:id', taskController.delete);
taskRouter.patch('/task/:taskId/user/:userId', taskController.complete);

export {taskRouter};