import express from "express";
const searchRouter = express.Router();
import { searchController } from "../controllers/index.js";

searchRouter.post('/search/user', searchController.searchUser);

export {searchRouter};


// * SWAGGER DOC * \\

/**
 * formulaire de recherche par pseudo
 * @typedef {object} formSearch
 * @property {string} pseudo.required - Pseudo (ou partie de pseudo) à rechercher
 */

/**
 * POST /search/user
 * @summary Recherche un user par rapport à son pseudo
 * @tags Search
 * @param {formSearch} request.body.required - Pseudo (ou partie de pseudo) à rechercher
 * @return {array<user>} 200 - success response - application/json
 */