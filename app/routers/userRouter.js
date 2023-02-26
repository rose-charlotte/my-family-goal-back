import express from "express";
const userRouter = express.Router();
import { userController } from "../controllers/index.js";

// Authentification
userRouter.post('/signin', userController.signin);
userRouter.post('/signup', userController.signup);

// CRUD user
userRouter.get('/user/:id', userController.get);
userRouter.patch('/user/:id', userController.update);
userRouter.delete('/user/:id', userController.delete);

export {userRouter};


// * SWAGGER DOC * \\

/**
 * Infos d'un utilisateur
 * @typedef {object} user
 * @property {integer} id.required - id de l'utilisateur
 * @property {string} fistname.required - Prénom de l'utilisateur
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
 * POST /signin
 * @summary Permet de se connecter
 * @tags User
 * @param {formConnect} request.body.required - Infos de connexion d'un utilisateur
 * @return {validConnect} 200 - success response - application/json
 */

/**
 * Infos de création de compte
 * @typedef {object} signup
 * @property {string} fistname.required - Prénom de l'utilisateur
 * @property {string} lastname.required - Nom de l'utilisateur
 * @property {string} pseudo.required - Pseudo de l'utilisateur
 * @property {string} email.required - Email de l'utilisateur
 * @property {string} password.required - Mot de passe de l'utilisateur
 */

/**
 * POST /signup
 * @summary Permet de se connecter
 * @tags User
 * @param {signup} request.body.required - Infos de création de compte utilisateur
 * @return {validConnect} 200 - success response - application/json
 */
/**
 * GET /user/{id}
 * @summary Récupère toutes les infos d'un utilisateur
 * @tags User
 * @param {integer} id.path - id du user
 * @return {memberSimple} 200 - success response - application/json
 */

/**
 * Infos de modification de compte
 * @typedef {object} updateUser
 * @property {string} fistname.required - Prénom de l'utilisateur
 * @property {string} lastname.required - Nom de l'utilisateur
 * @property {string} pseudo.required - Pseudo de l'utilisateur
 * @property {string} email.required - Email de l'utilisateur
 */

/**
 * PATCH /user/{id}
 * @summary Modifie les infos d'un utilisateur
 * @tags User
 * @param {integer} id.path - id du user
 * @param {updateUser} request.body.required - Infos de création de compte utilisateur
 * @return {validConnect} 200 - success response - application/json
 */

/**
 * DELETE /user/{id}
 * @summary Supprime un utilisateur
 * @tags User
 * @param {integer} id.path - id du user
 * @return {string} 200 - success response - application/json
 */