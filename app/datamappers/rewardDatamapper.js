import {client} from "../services/database.js";

const rewardDatamapper = {
    async create(form, familyId){
        const sql = `
            INSERT INTO reward(title, price, family_id)
            VALUES ($1, $2, $3)
            RETURNING *;`
        const values = [form.title, form.price, familyId];
        const result = await client.query(sql, values);
        return result.rows[0];
    }
}

export {rewardDatamapper};