-- Revert my_family_goal:5.add_primary_key from pg

BEGIN;

ALTER TABLE "user_has_family"
DROP CONSTRAINT user_has_family_pkey;

COMMIT;
