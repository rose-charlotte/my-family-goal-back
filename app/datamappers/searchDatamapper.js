import {client} from "../services/database.js";

const searchDatamapper = {
    async searchUserByPseudo(pseudo){
        const sql = `
            SELECT *
            FROM "user"
            WHERE pseudo ILIKE $1;`;
        const values = [`%${pseudo}%`];
        const result = await client.query(sql, values);
        return result.rows;
    }
}

export {searchDatamapper};