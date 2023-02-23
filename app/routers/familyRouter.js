import express from "express";
const familyRouter = express.Router();
import { familyController } from "../controllers/index.js";
import { security } from "../services/security.js";

familyRouter.post('/family', security.validateToken, familyController.create);
familyRouter.get('/family/:id', security.validateToken, familyController.get);
familyRouter.patch('/family/:id', familyController.update);

export {familyRouter};