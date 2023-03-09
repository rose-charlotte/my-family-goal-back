-- Verify my_family_goal:6.update_function on pg

BEGIN;

SELECT * FROM getFamilyById(1);
SELECT * FROM getUserById(1);

ROLLBACK;
