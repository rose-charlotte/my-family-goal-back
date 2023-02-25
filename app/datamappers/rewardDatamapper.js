import {client} from "../services/database.js";

const rewardDatamapper = {
    async create(form, familyId){
        const sql = `
            INSERT INTO reward(title, price, family_id)
            VALUES ($1, $2, $3)
            RETURNING *;`;
        const values = [form.title, form.price, familyId];
        const result = await client.query(sql, values);
        return result.rows[0];
    },
    
    async update(form, id){
        const sql = `
            UPDATE reward
            SET title = $1, price = $2, "isPurchase" = $3
            WHERE id = $4
            RETURNING *;`;
        const values = [form.title, form.price, form.isPurchase, id];
        const result = await client.query(sql, values);
        return result.rows[0];
    },

    async delete(id){
        const sql = `
            DELETE FROM reward
            WHERE id = $1;`;
        const values = [id];
        const result = await client.query(sql, values);
        return result.rowCount;
    },

    // PURCHASE REWARD
    async purchase(id){
        const sql = `
            UPDATE reward
            SET "isPurchase" = $1
            WHERE id = $2
            RETURNING *;`;
        const values = [true, id];
        const result = await client.query(sql, values);
        return result.rows[0];
    },

    async updateCredit(userId, familyId, price){
        const sql = `
            UPDATE user_has_family
            SET credit = credit - $1
            WHERE user_id = $2 AND family_id = $3
            RETURNING credit;`;
        const values = [price, userId, familyId];
        const result = await client.query(sql, values);
        return result.rows[0];
    }
}

export {rewardDatamapper};