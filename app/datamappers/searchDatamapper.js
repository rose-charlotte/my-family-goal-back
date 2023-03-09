import {client} from "../services/database.js";

const searchDatamapper = {
    async searchUserByPseudo(pseudo){
        const sql = `
            SELECT id, firstname, lastname, pseudo, email
            FROM "user"
            WHERE pseudo ILIKE $1
            ORDER BY pseudo;`;
        const values = [`%${pseudo}%`];
        const result = await client.query(sql, values);
        return result.rows;
    }
}

export {searchDatamapper};