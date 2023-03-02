-- Verify my_family_goal:5.add_primary_key on pg

BEGIN;

SELECT *
FROM   information_schema.table_constraints 
WHERE  table_name = 'user_has_family' 
AND    constraint_type = 'PRIMARY KEY';

ROLLBACK;
