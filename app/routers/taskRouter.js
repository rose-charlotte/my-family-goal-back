import express from "express";
const taskRouter = express.Router();
import { taskController } from "../controllers/index.js";

// CRUD task
taskRouter.post('/family/:id/task', taskController.create);
taskRouter.patch('/task/:id', taskController.update);
taskRouter.delete('/task/:id', taskController.delete);

// COMPLETE task
taskRouter.patch('/task/:taskId/user/:userId', taskController.complete);

export {taskRouter};