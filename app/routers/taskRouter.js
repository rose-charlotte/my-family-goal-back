import express from "express";
const taskRouter = express.Router();
import { taskController } from "../controllers/index.js";
import { security } from "../services/security.js";

// CRUD task
taskRouter.post('/family/:familyId/task', security.validateToken, security.checkIsParent, taskController.create);
taskRouter.patch('/task/:taskId', security.validateToken, security.checkIsParent, taskController.update);
taskRouter.delete('/task/:taskId', security.validateToken, security.checkIsParent, taskController.delete);

// COMPLETE task
taskRouter.patch('/task/:taskId/user/:userId', security.validateToken, security.checkLinkExist, taskController.complete);

export {taskRouter};


// * SWAGGER DOC * \\

// SCHEMAS

/**
 * Formulaire de création de tache
 * @typedef {object} reqTask
 * @property {string} title.required - Nom de la tache
 * @property {string} description.required - Description de la tache
 * @property {integer} gain.required - Nombre de crédit à gagner
 */

/**
 * Infos d'une tache
 * @typedef {object} task
 * @property {integer} id.required - Id de la tache
 * @property {string} title.required - Nom de la tache
 * @property {string} description.required - Description de la tache
 * @property {integer} gain.required - Nombre de crédit à gagner
 * @property {boolean} isComplete.required - Défini si la tache est déjà effectuée
 * @property {integer} family_id.required - Référence la famille à laquelle elle appartient
 */

/**
 * Formulaire de modification de tache
 * @typedef {object} patchTask
 * @property {string} title.required - Nom de la tache
 * @property {string} description.required - Description de la tache
 * @property {integer} gain.required - Nombre de crédit à gagner
 * @property {boolean} isComplete.required - Défini si la tache est déjà effectuée
*/

// ROUTES

/**
 * POST /family/{familyId}/task
 * @summary Crée une tache dans une famille
 * @security TokenAuth
 * @tags Task
 * @param {integer} familyId.path - Id de la famille
 * @param {reqTask} request.body.required - infos de la tache
 * @return {task} 200 - success response - application/json
 */

/**
 * PATCH /task/{taskId}
 * @summary Modifie une tache
 * @security TokenAuth
 * @tags Task
 * @param {integer} taskId.path - Id de la tache
 * @param {patchTask} request.body.required - Infos de la tache
 * @return {task} 200 - success response - application/json
 */

/**
 * DELETE /task/{taskId}
 * @summary Supprime une tache
 * @security TokenAuth
 * @tags Task
 * @param {integer} taskId.path - Id de la tache
 * @return {string} 200 - success response - application/json
 */

/**
 * PATCH /task/{taskId}/user/{userId}
 * @summary Passe la tache en isComplete = true et modifie le nombre de crédit d'un membre
 * @security TokenAuth
 * @tags Task
 * @param {integer} taskId.path - Id de la tache
 * @param {integer} userId.path - Id du membre
 * @return {credit} 200 - success response - application/json
 */