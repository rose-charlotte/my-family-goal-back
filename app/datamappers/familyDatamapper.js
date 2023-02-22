import {client} from "../services/database.js";

const familyDatamapper = {
    async findByName(name){
        const sql = `SELECT * FROM family WHERE name = $1`;
        const values = [name];
        const result = await client.query(sql, values);
        return result.rows[0];
    },

    async create(form){
        const sql = `
            INSERT INTO family (name)
            VALUES ($1)
            RETURNING *;`
        const values = [form.name];
        const result = await client.query(sql, values);
        return result.rows[0];
    },

    async createLink(userId, familyId){
        const sql = `
            INSERT INTO user_has_family (user_id, family_id)
            VALUES ($1, $2)
            RETURNING *;`
        const values = [userId, familyId];
        const result = await client.query(sql, values);
        return result.rows[0];
    }
}

export {familyDatamapper};