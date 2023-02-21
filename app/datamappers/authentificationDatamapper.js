import {client} from "../services/database.js";

const authentificationDatamapper = {
    async signin(email){
        const sql = `SELECT * FROM "user" WHERE email = $1`;
        const values = [email];
        const result = await client.query(sql, values);
        return result.rows[0];
    }
}

export {authentificationDatamapper};