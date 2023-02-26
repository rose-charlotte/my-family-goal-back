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


// * SWAGGER DOC * \\

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
 * POST /family/{id}/task
 * @summary Crée une tache dans une famille
 * @tags Task
 * @param {integer} id.path - Id de la famille
 * @param {reqTask} request.body.required - infos de la tache
 * @return {task} 200 - success response - application/json
 */

/**
 * Formulaire de modification de tache
 * @typedef {object} patchTask
 * @property {string} title.required - Nom de la tache
 * @property {string} description.required - Description de la tache
 * @property {integer} gain.required - Nombre de crédit à gagner
 * @property {boolean} isComplete.required - Défini si la tache est déjà effectuée
 */

/**
 * PATCH /task/{id}
 * @summary Modifie une tache
 * @tags Task
 * @param {integer} id.path - Id de la tache
 * @param {patchTask} request.body.required - Infos de la tache
 * @return {task} 200 - success response - application/json
 */

/**
 * DELETE /task/{id}
 * @summary Supprime une tache
 * @tags Task
 * @param {integer} id.path - Id de la tache
 * @return {string} 200 - success response - application/json
 */

/**
 * PATCH /task/{taskId}/user/{userId}
 * @summary Passe la tache en isComplete = true et modifie le nombre de crédit d'un membre
 * @tags Task
 * @param {integer} taskId.path - Id de la tache
 * @param {integer} userId.path - Id du membre
 * @return {credit} 200 - success response - application/json
 */