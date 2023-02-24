import express from "express";
const searchRouter = express.Router();
import { searchController } from "../controllers/index.js";

searchRouter.post('/search/user', searchController.searchUser);

export {searchRouter};