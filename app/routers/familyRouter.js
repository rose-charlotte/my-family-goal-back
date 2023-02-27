import express from "express";
const familyRouter = express.Router();
import { familyController } from "../controllers/index.js";
import { security } from "../services/security.js";

// CRUD family
familyRouter.post('/family', security.validateToken, familyController.create);
familyRouter.get('/family/:familyId', security.validateToken, security.checkLinkExist, familyController.get);
familyRouter.patch('/family/:familyId', security.validateToken, security.checkIsParent, familyController.update);
familyRouter.delete('/family/:familyId', security.validateToken, security.checkIsParent, familyController.delete);

// Members
familyRouter.post('/family/:familyId/user/:userId', security.validateToken, security.checkIsParent, familyController.addMember);
familyRouter.patch('/family/:familyId/user/:userId', security.validateToken, security.checkIsParent, familyController.updateMember);
familyRouter.delete('/family/:familyId/user/:userId', security.validateToken, security.checkIsParent, familyController.deleteMember);

export {familyRouter};


// * SWAGGER DOC * \\

// SCHEMAS

/**
 * body à envoyer pour créer une famille
 * @typedef {object} reqFamily
 * @property {string} name.required - Nom de la famille
 */

/**
 * réponse à la création d'une famille
 * @typedef {object} familySimple
 * @property {integer} id.required - id de la famille
 * @property {string} name.required - Nom de la famille
 */

/**
 * Infos d'une tache
 * @typedef {object} task
 * @property {integer} id.required - Id de la tache
 * @property {string} title.required - Nom de la tache
 * @property {string} description.required - Description de la tache
 * @property {integer} gain.required - Nombre de crédit à gagner
 * @property {boolean} isComplete.required - Détermine si la tache est déjà réalisée
 * @property {integer} family_id.required - Référence la famille à laquelle elle appartient
*/

/**
 * Infos d'un membre
 * @typedef {object} memberComplete
 * @property {integer} id.required - id du membre
 * @property {string} fistname.required - Prénom du membre
 * @property {string} lastname.required - Nom du membre
 * @property {string} pseudo.required - Pseudo du membre
 * @property {string} email.required - Email du membre
 * @property {boolean} isParent.required - Détermine si le membre à le role de parent
 * @property {integer} credit.required - Solde de crédit disponibles
*/

/**
 * Infos completes d'une famille
 * @typedef {object} familyComplete
 * @property {integer} id.required - id de la famille
 * @property {string} name.required - Nom de la famille
 * @property {array<task>} tasks.required - Taches de la famille
 * @property {array<reward>} rewards.required - Récompenses de la famille
 * @property {array<memberComplete>} members.required - Membres de la famille
*/

/**
 * Infos d'une liste de familles d'un membre avec son crédit et son statut
 * @typedef {object} statusFamily
 * @property {integer} id.required - id de la famille
 * @property {string} name.required - Nom de la famille
 * @property {integer} credit.required - Solde du membre
 * @property {boolean} isParent.required - Statut du membre au sein de cette famille
*/

/**
 * Infos d'un membre
 * @typedef {object} memberSimple
 * @property {integer} id.required - id du membre
 * @property {string} fistname.required - Prénom du membre
 * @property {string} lastname.required - Nom du membre
 * @property {string} pseudo.required - Pseudo du membre
 * @property {string} email.required - Email du membre
 * @property {array<statusFamily>} families.required - Liste des familles d'un membre
*/

/**
 * Formulaire de modification de role au sein d'une famille
 * @typedef {object} formRole
 * @property {boolean} IsParent.required - Détermine le role parent ou non
*/

/**
 * infos du lien entre un utilisateur et une famille
 * @typedef {object} link
 * @property {integer} user_id.required - Id de l'utilisateur
 * @property {integer} family_id.required - Id de la famille
 * @property {integer} credit.required - Solde du crédit disponible
 * @property {boolean} IsParent.required - Détermine le role parent ou non
*/

// ROUTES

/**
 * POST /family
 * @summary Crée une famille
 * @security TokenAuth
 * @tags Family
 * @param {reqFamily} request.body.required - family infos
 * @return {familySimple} 200 - success response - application/json
 */

/**
 * GET /family/{familyId}
 * @summary Récupère toutes les infos d'une famille
 * @security TokenAuth
 * @tags Family
 * @param {integer} familyId.path - id de la famille recherchée
 * @return {familyComplete} 200 - success response - application/json
*/

/**
 * PATCH /family/{familyId}
 * @summary Modifie les infos d'une famille
 * @security TokenAuth
 * @tags Family
 * @param {integer} familyId.path - id de la famille recherchée
 * @param {reqFamily} request.body.required - family infos
 * @return {familySimple} 200 - success response - application/json
 */

/**
 * DELETE /family/{familyId}
 * @summary Supprime une famille
 * @security TokenAuth
 * @tags Family
 * @param {integer} familyId.path - id de la famille recherchée
 * @return {string} 200 - success response - application/json
 */

/**
 * POST /family/{familyId}/user/{userId}
 * @summary Associe un utilisateur à une famille
 * @security TokenAuth
 * @tags Link
 * @param {integer} familyId.path - id de la famille
 * @param {integer} userId.path - id de l'utilisateur'
 * @return {memberSimple} 200 - success response - application/json
 */

/**
 * PATCH /family/{familyId}/user/{userId}
 * @summary Modifie le role d'un utilisateur dans une famille
 * @security TokenAuth
 * @tags Link
 * @param {integer} familyId.path - id de la famille
 * @param {integer} userId.path - id de l'utilisateur
 * @param {formRole} request.body.required - formulaire des modifications
 * @return {link} 200 - success response - application/json
 */

/**
 * DELETE /family/{familyId}/user/{userId}
 * @summary Supprime une famille
 * @security TokenAuth
 * @tags Link
 * @param {integer} familyId.path - id de la famille
 * @param {integer} userId.path - id de l'utilisateur
 * @return {string} 200 - success response - application/json
 */