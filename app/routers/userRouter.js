import express from "express";
const userRouter = express.Router();
import { userController } from "../controllers/index.js";
import { security } from "../services/security.js";

// Authentification
userRouter.post('/signin', userController.signin);
userRouter.post('/signup', userController.signup);

// CRUD user
userRouter.get('/user/:userId', security.validateToken, security.checkIsOwnerToHisAccount, userController.get);
userRouter.patch('/user/:userId', security.validateToken, security.checkIsOwnerToHisAccount, userController.update);
userRouter.delete('/user/:userId', security.validateToken, security.checkIsOwnerToHisAccount, userController.delete);

export {userRouter};


// * SWAGGER DOC * \\

// SCHEMAS

/**
 * Infos d'un utilisateur
 * @typedef {object} user
 * @property {integer} id.required - id de l'utilisateur
 * @property {string} firstname.required - Prénom de l'utilisateur
 * @property {string} lastname.required - Nom de l'utilisateur
 * @property {string} pseudo.required - Pseudo de l'utilisateur
 * @property {string} email.required - Email de l'utilisateur
 */

/**
 * Formulaire de connexion
 * @typedef {object} formConnect
 * @property {string} email.required - Email de l'utilisateur
 * @property {string} password.required - Mot de passe de l'utilisateur
 */

/**
 * Infos de retour de connexion avec le token
 * @typedef {object} validConnect
 * @property {user} user.required - Infos du user
 * @property {string} token.required - Token de connexion
 */

/**
 * Infos de création de compte
 * @typedef {object} signup
 * @property {string} firstname.required - Prénom de l'utilisateur
 * @property {string} lastname.required - Nom de l'utilisateur
 * @property {string} pseudo.required - Pseudo de l'utilisateur
 * @property {string} email.required - Email de l'utilisateur
 * @property {string} password.required - Mot de passe de l'utilisateur
*/

/**
 * Infos de modification de compte
 * @typedef {object} updateUser
 * @property {string} firstname.required - Prénom de l'utilisateur
 * @property {string} lastname.required - Nom de l'utilisateur
 * @property {string} pseudo.required - Pseudo de l'utilisateur
 * @property {string} email.required - Email de l'utilisateur
 */

// ROUTES

/**
 * POST /signin
 * @summary Permet de se connecter
 * @tags User
 * @param {formConnect} request.body.required - Infos de connexion d'un utilisateur
 * @return {validConnect} 200 - success response - application/json
 */

/**
 * POST /signup
 * @summary Permet de se créer son compte et se connecter
 * @tags User
 * @param {signup} request.body.required - Infos de création de compte utilisateur
 * @return {validConnect} 200 - success response - application/json
 */
/**
 * GET /user/{userId}
 * @summary Récupère toutes les infos d'un utilisateur
 * @security TokenAuth
 * @tags User
 * @param {integer} userId.path - id du user
 * @return {memberSimple} 200 - success response - application/json
 */

/**
 * PATCH /user/{userId}
 * @summary Modifie les infos d'un utilisateur
 * @security TokenAuth
 * @tags User
 * @param {integer} userId.path - id du user
 * @param {updateUser} request.body.required - Infos de création de compte utilisateur
 * @return {validConnect} 200 - success response - application/json
 */

/**
 * DELETE /user/{userId}
 * @summary Supprime un utilisateur
 * @security TokenAuth
 * @tags User
 * @param {integer} userId.path - id du user
 * @return {string} 200 - success response - application/json
 */