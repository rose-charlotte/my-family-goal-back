import { familyDatamapper, userDatamapper } from "../datamappers/index.js";
import { utils } from "../services/utils.js";
import { schemas } from "../services/validation.js";

const familyController = {
    async create(req, res) {
        const form = req.body;
        const user = req.user;
        const isParent = true;

        try {
            // validation
            await schemas.createUpdateFamily.validateAsync(form);

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
        const familyId = parseInt(req.params.familyId);
        const user = req.user;

        try {
            // validation
            await schemas.reqParams.validateAsync(familyId);

            // find family
            const family = await familyDatamapper.findById(familyId);
            if(!family) throw new Error(`Cannot get family with familyId = ${familyId}`);
            
            // verif if link exist
            const link = family.members?.find(member => member.id === user.id);
            if(!link) throw new Error(`Access Denied`);

            return res.json(family);
        } catch (error) {
            return res.status(500).json(error.message);
        }
    },
    
    async update(req, res){
        const familyId = parseInt(req.params.familyId);
        const form = req.body;

        try {
            // validation
            await schemas.reqParams.validateAsync(familyId);
            await schemas.createUpdateFamily.validateAsync(form);

            // update family
            const family = await familyDatamapper.update(form, familyId);
            if(!family) throw new Error(`Cannot get family with familyId = ${familyId}`);

            return res.json(family);
        } catch (error) {
            return res.status(500).json(error.message);
        }
    },

    async delete(req, res){
        const familyId = parseInt(req.params.familyId);

        try {
            // validation
            await schemas.reqParams.validateAsync(familyId);
            
            // delete family
            const linesCount = await familyDatamapper.delete(familyId);
            if(linesCount === 0) throw new Error(`Cannot delete family with familyId = ${familyId}`);

            return res.json(`Count of lines deleted : ${linesCount}`);
        } catch (error) {
            return res.status(500).json(error.message);
        }
    },
    
    async addMember(req, res){
        const familyId = parseInt(req.params.familyId);
        const userId = parseInt(req.params.userId);
        const isParent = false;

        try {
            // validation
            await schemas.reqParams.validateAsync(familyId);
            await schemas.reqParams.validateAsync(userId);

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
            // validation
            await schemas.reqParams.validateAsync(familyId);
            await schemas.reqParams.validateAsync(userId);
            await schemas.updateRole.validateAsync(isParent);

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
            // validation
            await schemas.reqParams.validateAsync(familyId);
            await schemas.reqParams.validateAsync(userId);
            
            // delete link
            const linesCount = await familyDatamapper.deleteLink(userId, familyId);
            if(linesCount === 0) throw new Error('Cannot delete link');

            // delete family if has no member
            const isFamilyDeleted = await utils.deleteFamilyIfNoMembers(familyId);

            return res.json(`Member deleted : ${linesCount} / Family deleted : ${isFamilyDeleted}`);
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }
}

export {familyController};