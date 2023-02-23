import { familyDatamapper } from "../datamappers/index.js";
import { userDatamapper } from "../datamappers/index.js";
import jwt from 'jsonwebtoken';

const familyController = {
    async create(req, res) {
        try {
            const form = req.body;
            const user = req.session.user;

            // check if name already exist
            const alreadyExist = await familyDatamapper.findByName(form.name);
            if(alreadyExist) throw new Error('Family name already exist');

            // insert family
            const family = await familyDatamapper.create(form);
            if(!family) throw new Error('Impossible to create family');
            
            // link user & family
            const link = await familyDatamapper.createLink(user.id, family.id);
            if(!link) throw new Error('Impossible to create link');

            // update role to "parent"
            const roleIdParent = 2;
            const userUpdated = await userDatamapper.updateRole(user.id, roleIdParent);
            
            // save update in session
            req.session.user = userUpdated;

            // generate new token
            const token = jwt.sign(userUpdated, process.env.SESSION_SECRET, {expiresIn: '7 days'});

            return res.json({family, "user": userUpdated, token});
        } catch (error) {
            return res.status(500).json(error.message);
        }
    },
    
    async get(req, res){
        try {
            const id = parseInt(req.params.id);
            const user = req.session.user;

            // find family
            const family = await familyDatamapper.findById(id);
            if(!family) throw new Error(`Cannot get family with id = ${id}`);
            
            // verif if link exist
            const link = family.members.find(member => member.id === user.id);
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
            return res.status(500).json(error.message);
        }
    }
}

export {familyController};