import jwt from 'jsonwebtoken';

const security = {
    validateToken(req, res, next){
        try {
            const token = req.headers.authorization.split(" ")[1];
            const user = jwt.verify(token, process.env.SESSION_SECRET);
            req.session.user = user;
            next();
        } catch (error) {
            return res.status(401).json(error.message);
        }
    },
    
    validateRoleUserOrParent(req, res, next){
        try {
            const user = req.session.user;
            // data from DB
            const roleIdUser = 1;
            const roleIdParent = 2;
            // check if role is different of "user" or "parent" 
            if (user.role_id !== roleIdUser && user.role_id !== roleIdParent) throw new Error('Access Denied');
            next();
        } catch (error) {
            return res.status(401).json(error.message);
        }
    }
}

export {security};