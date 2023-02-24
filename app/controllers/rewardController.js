import { rewardDatamapper } from "../datamappers/index.js";

const rewardController = {
    async create(req, res){
        try {
            const familyId = req.params.id;
            const form = req.body;

            // create reward
            const reward = await rewardDatamapper.create(form, familyId);
            if(!reward) throw new Error('Cannot create reward');

            return res.json(reward);
        } catch (error) {
            return res.status(500).json(error.message);  
        }
    }
}

export {rewardController};