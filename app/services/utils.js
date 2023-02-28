import { rewardDatamapper, taskDatamapper } from '../datamappers/index.js';

const utils = {
    async getFamilyId(req, res){
        let familyId;
        try {
            if(req.params.familyId){
                familyId = parseInt(req.params.familyId);
            } else if (req.params.rewardId) {
                const rewardId = req.params.rewardId;
                const reward = await rewardDatamapper.findById(rewardId);
                familyId = reward.family_id;
            } else if (req.params.taskId) {
                const taskId = req.params.taskId;
                const task = await taskDatamapper.findById(taskId);
                familyId = task.family_id;
            }
    
            return familyId;
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }
}

export { utils };