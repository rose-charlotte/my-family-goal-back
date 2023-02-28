import express from "express";
const rewardRouter = express.Router();
import { rewardController } from "../controllers/index.js";
import { security } from "../services/security.js";

// CRUD reward
rewardRouter.post('/family/:familyId/reward', security.validateToken, security.checkIsParent, rewardController.create);
rewardRouter.patch('/reward/:rewardId', security.validateToken, security.checkIsParent, rewardController.update);
rewardRouter.delete('/reward/:rewardId', security.validateToken, security.checkIsParent, rewardController.delete);

// PURCHASE reward
rewardRouter.patch('/reward/:rewardId/user/:userId', security.validateToken, security.checkLinkExist, rewardController.purchase);

export {rewardRouter};


// * SWAGGER DOC * \\

// SCHEMAS

/**
 * Formulaire de création de récompense
 * @typedef {object} reqReward
 * @property {string} title.required - Nom de la récompense
 * @property {integer} price.required - Nombre de crédit à dépenser
 */

/**
 * Infos d'une récompense
 * @typedef {object} reward
 * @property {integer} id.required - Id de la récompense
 * @property {string} title.required - Nom de la récompense
 * @property {integer} price.required - Nombre de crédit à dépenser
 * @property {boolean} isPurchase.required - Détermine si la récompense est déjà achetée
 * @property {integer} family_id.required - Référence la famille à laquelle elle appartient
 */

/**
 * Formulaire de création de récompense
 * @typedef {object} patchReward
 * @property {string} title.required - Nom de la récompense
 * @property {integer} price.required - Nombre de crédit à dépenser
 * @property {boolean} isPurchase.required - Défini Si la reward est achetée ou non
*/

/**
 * Formulaire de création de récompense
 * @typedef {object} credit
 * @property {integer} credit.required - Solde de crédit
 */

// ROUTES

/**
 * POST /family/{familyId}/reward
 * @summary Crée une récompense dans une famille
 * @security TokenAuth
 * @tags Reward
 * @param {integer} familyId.path - Id de la famille recherchée
 * @param {reqReward} request.body.required - Infos de la récompense
 * @return {reward} 200 - success response - application/json
 */

/**
 * PATCH /reward/{rewardId}
 * @summary Modifie une récompense
 * @security TokenAuth
 * @tags Reward
 * @param {integer} rewardId.path - Id de la récompense
 * @param {patchReward} request.body.required - Infos de la récompense
 * @return {reward} 200 - success response - application/json
 */

/**
 * DELETE /reward/{rewardId}
 * @summary Supprime une récompense
 * @security TokenAuth
 * @tags Reward
 * @param {integer} rewardId.path - Id de la récompense
 * @return {string} 200 - success response - application/json
 */

/**
 * PATCH /reward/{rewardId}/user/{userId}
 * @summary Passe la récompense en isPurchase = true et modifie le nombre de crédit d'un membre
 * @security TokenAuth
 * @tags Reward
 * @param {integer} rewardId.path - Id de la récompense
 * @param {integer} userId.path - Id du membre
 * @return {credit} 200 - success response - application/json
 */