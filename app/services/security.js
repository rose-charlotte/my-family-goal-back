import jwt from 'jsonwebtoken';
import { rewardDatamapper, taskDatamapper, userDatamapper } from '../datamappers/index.js';
import { utils } from './utils.js';

const security = {
    createToken(data){
        return jwt.sign(data, process.env.SESSION_SECRET, {expiresIn: '7 days'});
    },

    validateToken(req, res, next){
        try {
            const token = req.headers.authorization.split(" ")[1];
            const user = jwt.verify(token, process.env.SESSION_SECRET);
            req.user = user;
            next();
        } catch (error) {
            return res.status(401).json(error.message);
        }
    },

    async checkIsParent(req, res, next){
        const userId = req.user.id;
        
        try {
            const familyId = await utils.getFamilyId();

            const user = await userDatamapper.findById(userId);

            const link = user.families.find(family => family.id === familyId);
            if(!link.isParent) throw new Error('Acces denied');

            next();
        } catch (error) {
            return res.status(401).json(error.message);
        }
    },

    checkIsOwnerToHisAccount(req, res, next){
        const userIdConnected = req.user.id;
        const userIdUpdated = parseInt(req.params.userId);
        if (userIdConnected === userIdUpdated){
            next();
        } else {
            return res.status(401).json('Access denied');
        }
    },

    async checkLinkExist(req, res, next){
        const userId = req.user.id;
        try {
            const familyId = await utils.getFamilyId();

            const user = await userDatamapper.findById(userId);

            const link = user.families.find(family => family.id === familyId);
            if(!link) throw new Error('Acces denied');

            next();
        } catch (error) {
            return res.status(401).json(error.message);
        }
    }
}

export {security};