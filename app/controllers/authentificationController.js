import { authentificationDatamapper } from "../datamappers/index.js";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const authentificationController = {
    async signin(req, res){
        try {
            // find user with email
            const email = req.body.email
            const user = await authentificationDatamapper.signin(email);
            if(!user) throw new Error('No user found');
            
            // check password
            const password = req.body.password;
            const isValidPassword = await bcrypt.compare(password, user.password);
            if (user && !isValidPassword) throw new Error('Invalid Password');

            // No error : User find, password valid
            // delete password property of user object
            delete user.password;
            // save user in session
            req.session.user = user;
            // create token jwt
            const token = jwt.sign(user, process.env.SESSION_SECRET, {expiresIn: '1h'});
            return res.json({token});
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }
}

export {authentificationController};