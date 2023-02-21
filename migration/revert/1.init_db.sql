-- Revert my_family_goal:1.init_db from pg

BEGIN;

DROP INDEX pseudo_index;
DROP TABLE IF EXISTS "role", "user", "family", "user_has_family", "task", "reward";
DROP DOMAIN email_address, pseudo, positive_integer;

COMMIT;
