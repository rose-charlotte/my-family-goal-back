-- Revert my_family_goal:3.move_table_role from pg

BEGIN;

CREATE TABLE "role" (
    "id"    INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "label" TEXT NOT NULL UNIQUE
);

INSERT INTO "role"(label) VALUES
('simple_user'),
('parent'),
('child');

ALTER TABLE "user"
ADD COLUMN role_id INTEGER NOT NULL DEFAULT 1 REFERENCES "role"("id");

UPDATE "user"
SET "role_id" = 3
WHERE id IN (
    SELECT user_id
    FROM user_has_family
    WHERE isParent = false
);

UPDATE "user"
SET "role_id" = 2
WHERE id IN (
    SELECT user_id
    FROM user_has_family
    WHERE isParent = true
);

ALTER TABLE user_has_family
DROP COLUMN isParent;

COMMIT;
