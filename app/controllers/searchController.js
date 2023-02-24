import { searchDatamapper } from "../datamappers/index.js";

const searchController = {
    async searchUser(req, res){
        try {
            const pseudo = req.body.pseudo;

            // search users with pseudo ILIKE req.body.pseudo
            const users = await searchDatamapper.searchUserByPseudo(pseudo);

            return res.json(users);
        } catch (error) {
            return res.status(500).json(error.message); 
        }
    }
}

export {searchController};