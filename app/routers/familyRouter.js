import express from "express";
const familyRouter = express.Router();
import { familyController } from "../controllers/index.js";
import { security } from "../services/security.js";

familyRouter.post('/family',security.validateToken, security.validateRoleUserOrParent , familyController.create);

export {familyRouter};