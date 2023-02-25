import { searchDatamapper } from "../datamappers/index.js";

const searchController = {
    async searchUser(req, res){
        const pseudo = req.body.pseudo;
        
        try {
            // search users
            const users = await searchDatamapper.searchUserByPseudo(pseudo);

            return res.json(users);
        } catch (error) {
            return res.status(500).json(error.message); 
        }
    }
}

export {searchController};