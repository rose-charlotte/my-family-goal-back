import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { userDatamapper } from "../datamappers/index.js";
import { security } from "../services/security.js";

const userController = {
    async signin(req, res){
        const email = req.body.email;
        const password = req.body.password;

        try {
            // find user with email
            const user = await userDatamapper.findByEmail(email);
            if(!user) throw new Error('No user found');
            
            // check password
            const isValidPassword = await bcrypt.compare(password, user.password);
            if (user && !isValidPassword) throw new Error('Invalid Password');

            // récupère les infos du user à transmettre
            const userConnected = await userDatamapper.findById(user.id);
            
            // create token jwt
            const token = security.createToken(user);

            return res.json({"user" : userConnected, token});
        } catch (error) {
            return res.status(500).json(error.message);
        }
    },
    
    async signup(req, res){
        const form = req.body;
        const saltRounds = 10;

        try {
            // hash password
            const hash = await bcrypt.hash(form.password, saltRounds);
            form.password = hash;

            // Check if email already exist
            const emailFound = await userDatamapper.findByEmail(form.email);
            if(emailFound) throw new Error('Email already exist');

            // Check if pseudo already exist
            const pseudoFound = await userDatamapper.findByPseudo(form.pseudo);
            if(pseudoFound) throw new Error('Pseudo already exist');
            
            // create user in DB
            const user = await userDatamapper.create(form);
            if(!user) throw new Error('Impossible to create user');

            // create token jwt
            const token = security.createToken(user);

            return res.json({user, token});
        } catch (error) {
            return res.status(500).json(error.message);
        }
    },
    
    async get(req, res){
        const id = parseInt(req.params.id);

        try {
            // Find user
            const user = await userDatamapper.findById(id);

            return res.json(user);
        } catch (error) {
            return res.status(500).json(error.message);
        }
    },
    
    async update(req, res){
        const id = parseInt(req.params.id);
        const form = req.body;

        try {
            // update user
            const user = await userDatamapper.update(form, id);
            if(!user) throw new Error('Impossible to update user');

            // create token jwt
            const token = security.createToken(user);

            return res.json({user, token});
        } catch (error) {
            return res.status(500).json(error.message);            
        }
    },

    async delete(req, res){
        const id = parseInt(req.params.id);
        
        try {
            // delete user
            const linesCount = await userDatamapper.delete(id);
            if(linesCount === 0) throw new Error(`Cannot delete user with id = ${id}`);

            res.json(`Count of lines deleted : ${linesCount}`);
        } catch (error) {
            return res.status(500).json(error.message);            
        }
    }
}

export {userController};