-- Revert my_family_goal:4.create_function from pg

BEGIN;

-- Before revert, must to replace fuction code into datamapper

DROP FUNCTION getUserById;
DROP FUNCTION getFamilyById;
DROP TYPE user_infos;
DROP TYPE family_infos;

COMMIT;
