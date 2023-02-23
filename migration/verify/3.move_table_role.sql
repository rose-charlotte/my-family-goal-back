-- Verify my_family_goal:3.move_table_role on pg

BEGIN;

SELECT isParent
FROM user_has_family;

ROLLBACK;
