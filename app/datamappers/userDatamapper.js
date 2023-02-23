import {client} from "../services/database.js";

const userDatamapper = {
    async findByEmail(email){
        const sql = `SELECT * FROM "user" WHERE email = $1`;
        const values = [email];
        const result = await client.query(sql, values);
        return result.rows[0];
    },
    
    async findById(id){
        const sql = `
            SELECT id, firstname, lastname, pseudo, email, role_id, (
                SELECT json_agg(
                    json_build_object(
                        'id', id,
                        'name', name,
                        'credit', credit
                    )
                ) AS families
                FROM family
                JOIN user_has_family ON family.id = family_id
                WHERE user_id = $1
            )
            FROM "user"
            WHERE id = $1`;
        const values = [id];
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
    },
    
    async updateRole(id, roleId){
        const sql = `
            UPDATE "user"
            SET role_id = $1
            WHERE id = $2
            RETURNING id, firstname, lastname, pseudo, email, role_id;`
        const values = [roleId, id];
        const result = await client.query(sql, values);
        return result.rows[0];
    }
}

export {userDatamapper};