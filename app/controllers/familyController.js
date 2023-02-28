import { familyDatamapper } from "../datamappers/index.js";
import { userDatamapper } from "../datamappers/index.js";

const familyController = {
    async create(req, res) {
        const form = req.body;
        const user = req.user;
        const isParent = true;

        try {
            // check if name already exist
            const alreadyExist = await familyDatamapper.findByName(form.name);
            if(alreadyExist) throw new Error('Family name already exist');

            // insert family
            const family = await familyDatamapper.create(form);
            if(!family) throw new Error('Impossible to create family');
            
            // link user & family
            const link = await familyDatamapper.createLink(user.id, family.id, isParent);
            if(!link) throw new Error('Impossible to create link');
            
            return res.json(family);
        } catch (error) {
            return res.status(500).json(error.message);
        }
    },
    
    async get(req, res){
        const id = parseInt(req.params.familyId);
        const user = req.user;

        try {
            // find family
            const family = await familyDatamapper.findById(id);
            if(!family) throw new Error(`Cannot get family with id = ${id}`);
            
            // verif if link exist
            const link = family.members?.find(member => member.id === user.id);
            if(!link) throw new Error(`Access Denied`);

            return res.json(family);
        } catch (error) {
            return res.status(500).json(error.message);
        }
    },
    
    async update(req, res){
        const id = parseInt(req.params.familyId);
        const form = req.body;

        try {
            // update family
            const family = await familyDatamapper.update(form, id);
            if(!family) throw new Error(`Cannot get family with id = ${id}`);

            res.json(family);
        } catch (error) {
            return res.status(500).json(error.message);
        }
    },

    async delete(req, res){
        const id = parseInt(req.params.familyId);

        try {
            // delete family
            const linesCount = await familyDatamapper.delete(id);
            if(linesCount === 0) throw new Error(`Cannot delete family with id = ${id}`);

            res.json(`Count of lines deleted : ${linesCount}`);
        } catch (error) {
            return res.status(500).json(error.message);
        }
    },
    
    async addMember(req, res){
        const familyId = parseInt(req.params.familyId);
        const userId = parseInt(req.params.userId);
        const isParent = false;

        try {
            // get user
            const user = await userDatamapper.findById(userId);
            if(!user) throw new Error('No user found');

            // create link
            const link = await familyDatamapper.createLink(userId, familyId, isParent);
            if(!link) throw new Error('Cannot create link');

            return res.json(user);
        } catch (error) {
            return res.status(500).json(error.message);
        }
    },
    
    async updateMember(req, res){
        const familyId = parseInt(req.params.familyId);
        const userId = parseInt(req.params.userId);
        const isParent = req.body.isParent;

        try {
            // update role
            const link = await familyDatamapper.updateRole(userId, familyId, isParent);
            if(!link) throw new Error('Cannot update link');

            return res.json(link);
        } catch (error) {
            return res.status(500).json(error.message);
        }
    },

    async deleteMember(req, res){
        const familyId = parseInt(req.params.familyId);
        const userId = parseInt(req.params.userId);
        
        try {
            // delete link
            const linesCount = await familyDatamapper.deleteLink(userId, familyId);
            if(linesCount === 0) throw new Error('Cannot delete link');

            res.json(`Count of lines deleted : ${linesCount}`);
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }
}

export {familyController};