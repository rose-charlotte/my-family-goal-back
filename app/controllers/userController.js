import { userDatamapper } from "../datamappers/index.js";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const userController = {
    async signin(req, res){
        try {
            // find user with email
            const email = req.body.email
            const user = await userDatamapper.findByEmail(email);
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
            const token = jwt.sign(user, process.env.SESSION_SECRET, {expiresIn: '7 days'});
            return res.json({user, token});
        } catch (error) {
            return res.status(500).json(error.message);
        }
    },
    
    async signup(req, res){
        try {
            const form = req.body;
            // hash password
            const saltRounds = 10;
            const hash = await bcrypt.hash(form.password, saltRounds);
            form.password = hash;

            // Check if email or pseudo already exist
            const emailFound = await userDatamapper.findByEmail(form.email);
            if(emailFound){
                throw new Error('Email already exist');
            } else {
                const pseudoFound = await userDatamapper.findByPseudo(form.pseudo);
                if(pseudoFound) throw new Error('Pseudo already exist');
            }
            
            // create user in DB
            const user = await userDatamapper.create(form);
            if(!user) throw new Error('Impossible to create user');
            
            // save user in session
            req.session.user = user;

            // create token jwt
            const token = jwt.sign(user, process.env.SESSION_SECRET, {expiresIn: '7 days'});
            return res.json({user, token});
        } catch (error) {
            return res.status(500).json(error.message);
        }
    },
    
    async get(req, res){
        try {
            const id = parseInt(req.params.id);
            // Find user
            const user = await userDatamapper.findById(id);
            return res.json(user);
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }
}

export {userController};