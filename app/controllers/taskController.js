import { taskDatamapper } from "../datamappers/index.js";

const taskController = {
    async create(req, res){
        try {
            const familyId = req.params.id;
            const form = req.body;

            // create task
            const task = await taskDatamapper.create(form, familyId);
            if(!task) throw new Error('Cannot create task');

            return res.json(task);
        } catch (error) {
            return res.status(500).json(error.message);  
        }
    },

    async update(req, res){
        try {
            const id = req.params.id;
            const form = req.body;

            // update task
            const task = await taskDatamapper.update(form, id);
            if(!task) throw new Error('Cannot update task');

            return res.json(task);
        } catch (error) {
            return res.status(500).json(error.message);  
        }
    },

    async delete(req, res){
        try {
            const id = req.params.id;

            // delete task
            const linesCount = await taskDatamapper.delete(id);
            if(!linesCount) throw new Error(`Cannot delete task with id = ${id}`);

            return res.json(`Count of lines deleted : ${linesCount}`);
        } catch (error) {
            return res.status(500).json(error.message);  
        }
    },

    async complete(req, res){
        try {
            const taskId = req.params.taskId;
            const userId = req.params.userId;

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