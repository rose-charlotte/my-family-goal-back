import { searchDatamapper } from "../datamappers/index.js";
import { schemas } from "../services/validation.js";

const searchController = {
    async searchUser(req, res){
        const form = req.body;
        
        try {
            // validation
            await schemas.searchPseudo.validateAsync(form);

            // search users
            const users = await searchDatamapper.searchUserByPseudo(form.pseudo);

            return res.json(users);
        } catch (error) {
            return res.status(500).json(error.message); 
        }
    }
}

export {searchController};