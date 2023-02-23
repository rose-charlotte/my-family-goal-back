-- Deploy my_family_goal:3.move_table_role to pg

BEGIN;

ALTER TABLE user_has_family
ADD COLUMN "isParent" BOOLEAN NOT NULL DEFAULT false;

UPDATE user_has_family
SET "isParent" = true
WHERE user_id IN (
    SELECT id
    FROM "user"
    WHERE role_id = 2
);

ALTER TABLE "user"
DROP COLUMN role_id;

DROP TABLE role;

COMMIT;
