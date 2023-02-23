-- Verify my_family_goal:2.add_constraint on pg

BEGIN;

SELECT *
FROM "user"
JOIN user_has_family ON "user".id = user_id
JOIN family ON family.id = family_id;

ROLLBACK;
