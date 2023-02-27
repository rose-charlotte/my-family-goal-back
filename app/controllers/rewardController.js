import { rewardDatamapper } from "../datamappers/index.js";

const rewardController = {
    async create(req, res){
        const familyId = req.params.familyId;
        const form = req.body;
        
        try {
            // create reward
            const reward = await rewardDatamapper.create(form, familyId);
            if(!reward) throw new Error('Cannot create reward');

            return res.json(reward);
        } catch (error) {
            return res.status(500).json(error.message);  
        }
    },
    
    async update(req, res){
        const rewardId = req.params.rewardId;
        const form = req.body;

        try {
            // update reward
            const reward = await rewardDatamapper.update(form, rewardId);
            if(!reward) throw new Error('Cannot update reward');

            return res.json(reward);
        } catch (error) {
            return res.status(500).json(error.message);  
        }
    },
    
    async delete(req, res){
        const rewardId = req.params.rewardId;

        try {
            // delete reward
            const linesCount = await rewardDatamapper.delete(rewardId);
            if(!linesCount) throw new Error(`Cannot delete reward with rewardId = ${rewardId}`);

            return res.json(`Count of lines deleted : ${linesCount}`);
        } catch (error) {
            return res.status(500).json(error.message);  
        }
    },
    
    async purchase(req, res){
        const rewardId = +req.params.rewardId;
        const userId = req.params.userId;

        try {
            // TODO Vérifier si l'utilisateur a assez de crédits

            // update reward
            const reward = await rewardDatamapper.purchase(rewardId);
            if(!reward) throw new Error('Cannot purchase reward');

            // update credit
            const credit = await rewardDatamapper.updateCredit(userId, reward.family_id, reward.price);
            if(!credit) throw new Error('Cannot update credit');

            return res.json(credit);
        } catch (error) {
            return res.status(500).json(error.message);  
        }
    }
}

export {rewardController};