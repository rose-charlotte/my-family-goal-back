-- Verify my_family_goal:4.create_function on pg

BEGIN;

-- Need to create first user

SELECT * FROM getFamilyById(1);
SELECT * FROM getUserById(1);

ROLLBACK;
