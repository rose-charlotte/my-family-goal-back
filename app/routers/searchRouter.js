import express from "express";
const searchRouter = express.Router();
import { searchController } from "../controllers/index.js";
import { security } from "../services/security.js";

searchRouter.post('/search/user', security.validateToken, searchController.searchUser);

export {searchRouter};


// * SWAGGER DOC * \\

// SCHEMAS

/**
 * formulaire de recherche par pseudo
 * @typedef {object} formSearch
 * @property {string} pseudo.required - Pseudo (ou partie de pseudo) à rechercher
 */

// ROUTES

/**
 * POST /search/user
 * @summary Recherche un user par rapport à son pseudo
 * @security TokenAuth
 * @tags Search
 * @param {formSearch} request.body.required - Pseudo (ou partie de pseudo) à rechercher
 * @return {array<user>} 200 - success response - application/json
 */