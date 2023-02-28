import {client} from "../services/database.js";

const taskDatamapper = {
    async create(form, familyId){
        const sql = `
            INSERT INTO task(title, description, gain, family_id)
            VALUES ($1, $2, $3, $4)
            RETURNING *;`;
        const values = [form.title, form.description, form.gain, familyId];
        const result = await client.query(sql, values);
        return result.rows[0];
    },

    async findById(taskId){
        const sql = `
            SELECT *
            FROM task
            WHERE id = $1;`;
        const values = [taskId];
        const result = await client.query(sql, values);
        return result.rows[0];
    },

    async update(form, id){
        const sql = `
            UPDATE task
            SET title = $1, description = $2, gain = $3, "isComplete" = $4
            WHERE id = $5
            RETURNING *;`;
        const values = [form.title, form.description, form.gain, form.isComplete, id];
        const result = await client.query(sql, values);
        return result.rows[0];
    },

    async delete(id){
        const sql = `
            DELETE FROM task
            WHERE id = $1;`;
        const values = [id];
        const result = await client.query(sql, values);
        return result.rowCount;
    },

    // COMPLETE TASK
    async complete(id){
        const sql = `
            UPDATE task
            SET "isComplete" = $1
            WHERE id = $2
            RETURNING *;`;
        const values = [true, id];
        const result = await client.query(sql, values);
        return result.rows[0];
    },

    async updateCredit(userId, familyId, gain){
        const sql = `
            UPDATE user_has_family
            SET credit = credit + $1
            WHERE user_id = $2 AND family_id = $3
            RETURNING credit;`;
        const values = [gain, userId, familyId];
        const result = await client.query(sql, values);
        return result.rows[0];
    }
}

export {taskDatamapper};