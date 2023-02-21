import {client} from "../services/database.js";

const authentificationDatamapper = {
    async findByEmail(email){
        const sql = `SELECT * FROM "user" WHERE email = $1`;
        const values = [email];
        const result = await client.query(sql, values);
        return result.rows[0];
    },

    async findByPseudo(pseudo){
        const sql = `SELECT * FROM "user" WHERE pseudo = $1`;
        const values = [pseudo];
        const result = await client.query(sql, values);
        return result.rows[0];
    },

    async create(form){
        const sql = `
            INSERT INTO "user"(firstname, lastname, pseudo, email, password)
            VALUES ($1, $2, $3, $4, $5)
            RETURNING id, firstname, lastname, pseudo, email, role_id;`
        const values = [form.firstname, form.lastname, form.pseudo, form.email, form.password];
        const result = await client.query(sql, values);
        return result.rows[0];
    }
}

export {authentificationDatamapper};