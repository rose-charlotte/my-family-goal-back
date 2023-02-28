import { taskDatamapper } from "../datamappers/index.js";

const taskController = {
    async create(req, res){
        const familyId = req.params.familyId;
        const form = req.body;

        try {
            // create task
            const task = await taskDatamapper.create(form, familyId);
            if(!task) throw new Error('Cannot create task');

            return res.json(task);
        } catch (error) {
            return res.status(500).json(error.message);  
        }
    },

    async update(req, res){
        const taskId = req.params.taskId;
        const form = req.body;

        try {
            // update task
            const task = await taskDatamapper.update(form, taskId);
            if(!task) throw new Error('Cannot update task');

            return res.json(task);
        } catch (error) {
            return res.status(500).json(error.message);  
        }
    },

    async delete(req, res){
        const taskId = req.params.taskId;

        try {
            // delete task
            const linesCount = await taskDatamapper.delete(taskId);
            if(!linesCount) throw new Error(`Cannot delete task with taskId = ${taskId}`);

            return res.json(`Count of lines deleted : ${linesCount}`);
        } catch (error) {
            return res.status(500).json(error.message);  
        }
    },

    async complete(req, res){
        const taskId = req.params.taskId;
        const userId = req.params.userId;
        
        try {
            // update task
            const task = await taskDatamapper.complete(taskId);
            if(!task) throw new Error('Cannot complete task');

            // update credit
            const credit = await taskDatamapper.updateCredit(userId, task.family_id, task.gain);
            if(!credit) throw new Error('Cannot update credit');

            return res.json(credit);
        } catch (error) {
            return res.status(500).json(error.message);  
        }
    }
}

export {taskController};