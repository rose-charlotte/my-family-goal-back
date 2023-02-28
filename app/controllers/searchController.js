import { searchDatamapper } from "../datamappers/index.js";
import { schemas } from "../services/validation.js";

const searchController = {
    async searchUser(req, res){
        const pseudo = req.body.pseudo;
        
        try {
            // validation
            await schemas.searchPseudo.validateAsync(pseudo);

            // search users
            const users = await searchDatamapper.searchUserByPseudo(pseudo);

            return res.json(users);
        } catch (error) {
            return res.status(500).json(error.message); 
        }
    }
}

export {searchController};