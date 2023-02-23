-- Verify my_family_goal:1.init_db on pg

BEGIN;

SELECT (id, firstname, lastname, pseudo, email, password) FROM "user";
SELECT (id, name) FROM "family";
SELECT (user_id, family_id, credit) FROM "user_has_family";
SELECT (id, title, description, gain, "isComplete", family_id) FROM "task";
SELECT (id, title, price, "isPurchase", family_id) FROM "reward";

ROLLBACK;
