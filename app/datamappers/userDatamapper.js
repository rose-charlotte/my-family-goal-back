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
            SELECT id, firstname, lastname, pseudo, email, (
                SELECT json_agg(
                    json_build_object(
                        'id', id,
                        'name', name,
                        'credit', credit,
                        'isParent', "isParent"
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
            RETURNING id, firstname, lastname, pseudo, email;`
        const values = [form.firstname, form.lastname, form.pseudo, form.email, form.password];
        const result = await client.query(sql, values);
        return result.rows[0];
    },
    
    async update(form, id){
        const sql = `
            UPDATE "user"
            SET firstname = $1, lastname = $2, pseudo = $3, email = $4
            WHERE id = $5
            RETURNING id, firstname, lastname, pseudo, email;`
        const values = [form.firstname, form.lastname, form.pseudo, form.email, id];
        const result = await client.query(sql, values);
        return result.rows[0];
    },

    async delete(id){
        const sql = `DELETE FROM "user" WHERE id = $1;`
        const values = [id];
        const result = await client.query(sql, values);
        return result.rowCount;
    }
}

export {userDatamapper};