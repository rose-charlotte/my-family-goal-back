import express from "express";
const familyRouter = express.Router();
import { familyController } from "../controllers/index.js";
import { security } from "../services/security.js";

// CRUD family
familyRouter.post('/family', security.validateToken, familyController.create);
familyRouter.get('/family/:id', security.validateToken, familyController.get);
familyRouter.patch('/family/:id', security.validateToken, familyController.update);
familyRouter.delete('/family/:id', security.validateToken, familyController.delete);

// Members
familyRouter.post('/family/:familyId/user/:userId', familyController.addMember);
familyRouter.patch('/family/:familyId/user/:userId', familyController.updateMember);
familyRouter.delete('/family/:familyId/user/:userId', familyController.deleteMember);

export {familyRouter};