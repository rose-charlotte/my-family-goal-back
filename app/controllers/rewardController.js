import { rewardDatamapper, userDatamapper } from "../datamappers/index.js";
import { schemas } from "../services/validation.js";

const rewardController = {
    async create(req, res){
        const familyId = parseInt(req.params.familyId);
        const form = req.body;
        
        try {
            // validation
            await schemas.reqParams.validateAsync(familyId);
            await schemas.createReward.validateAsync(form);

            // create reward
            const reward = await rewardDatamapper.create(form, familyId);
            if(!reward) throw new Error('Cannot create reward');

            return res.json(reward);
        } catch (error) {
            return res.status(500).json(error.message);  
        }
    },
    
    async update(req, res){
        const rewardId = parseInt(req.params.rewardId);
        const form = req.body;

        try {
            // validation
            await schemas.reqParams.validateAsync(rewardId);
            await schemas.updateReward.validateAsync(form);
            
            // update reward
            const reward = await rewardDatamapper.update(form, rewardId);
            if(!reward) throw new Error('Cannot update reward');

            return res.json(reward);
        } catch (error) {
            return res.status(500).json(error.message);  
        }
    },
    
    async delete(req, res){
        const rewardId = parseInt(req.params.rewardId);

        try {
            // validation
            await schemas.reqParams.validateAsync(rewardId);

            // delete reward
            const linesCount = await rewardDatamapper.delete(rewardId);
            if(!linesCount) throw new Error(`Cannot delete reward with rewardId = ${rewardId}`);

            return res.json(`Count of lines deleted : ${linesCount}`);
        } catch (error) {
            return res.status(500).json(error.message);
        }
    },
    
    async purchase(req, res){
        const rewardId = parseInt(req.params.rewardId);
        const userId = parseInt(req.params.userId);

        try {
            // validation
            await schemas.reqParams.validateAsync(rewardId);
            await schemas.reqParams.validateAsync(userId);
            
            // check if user has enought credit
            const user = await userDatamapper.findById(userId);
            const reward = await rewardDatamapper.findById(rewardId);
            const link = user.families.find(family => family.id === reward.family_id);
            const creditBeforePurchase = link.credit;
            if(reward.price > creditBeforePurchase) throw new Error('insufficient credits');

            // update reward
            const rewardPurchased = await rewardDatamapper.purchase(rewardId);
            if(!rewardPurchased) throw new Error('Cannot purchase reward');

            // update credit
            const credit = await rewardDatamapper.updateCredit(userId, rewardPurchased.family_id, rewardPurchased.price);
            if(!credit) throw new Error('Cannot update credit');

            return res.json(credit);
        } catch (error) {
            return res.status(500).json(error.message);  
        }
    }
}

export {rewardController};