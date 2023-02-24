import { familyDatamapper } from "../datamappers/index.js";
import { userDatamapper } from "../datamappers/index.js";

const familyController = {
    async create(req, res) {
        try {
            const form = req.body;
            const user = req.user;

            // check if name already exist
            const alreadyExist = await familyDatamapper.findByName(form.name);
            if(alreadyExist) throw new Error('Family name already exist');

            // insert family
            const family = await familyDatamapper.create(form);
            if(!family) throw new Error('Impossible to create family');
            
            // link user & family
            const isParent = true;
            const link = await familyDatamapper.createLink(user.id, family.id, isParent);
            if(!link) throw new Error('Impossible to create link');
            
            return res.json(family);
        } catch (error) {
            return res.status(500).json(error.message);
        }
    },
    
    async get(req, res){
        try {
            const id = parseInt(req.params.id);
            const user = req.user;

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
        try {
            const id = parseInt(req.params.id);
            const form = req.body;
            
            // update family
            const family = await familyDatamapper.update(form, id);
            if(!family) throw new Error(`Cannot get family with id = ${id}`);

            res.json(family);
        } catch (error) {
            return res.status(500).json(error.message);
        }
    },

    async delete(req, res){
        try {
            const id = parseInt(req.params.id);
            
            // delete family
            const linesCount = await familyDatamapper.delete(id);
            if(linesCount === 0) throw new Error(`Cannot delete family with id = ${id}`);

            res.json(`Count of lines deleted : ${linesCount}`);
        } catch (error) {
        }
    },
    
    async addMember(req, res){
        try {
            const familyId = parseInt(req.params.familyId);
            const userId = parseInt(req.params.userId);

            // get user
            const user = await userDatamapper.findById(userId);
            if(!user) throw new Error('No user found');

            // create link
            const isParent = false;
            const link = await familyDatamapper.createLink(userId, familyId, isParent);
            if(!link) throw new Error('Cannot create link');

            res.json(user);
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }
}

export {familyController};