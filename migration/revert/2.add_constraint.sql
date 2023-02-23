-- Revert my_family_goal:2.add_constraint from pg

BEGIN;

ALTER TABLE user_has_family
DROP CONSTRAINT user_has_family_family_id_fkey;
ALTER TABLE user_has_family
DROP CONSTRAINT user_has_family_user_id_fkey;

ALTER TABLE user_has_family
ADD CONSTRAINT user_has_family_family_id_fkey
FOREIGN KEY (family_id)
REFERENCES family(id);
ALTER TABLE user_has_family
ADD CONSTRAINT user_has_family_user_id_fkey
FOREIGN KEY (user_id)
REFERENCES "user"(id);

COMMIT;
