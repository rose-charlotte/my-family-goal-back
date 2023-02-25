import jwt from 'jsonwebtoken';

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
    }
}

export {security};