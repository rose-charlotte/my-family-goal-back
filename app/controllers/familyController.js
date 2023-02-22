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
            const token = jwt.sign(userUpdated, process.env.SESSION_SECRET, {expiresIn: '1h'});

            return res.json({family, "user": userUpdated, token});
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }
}

export {familyController};