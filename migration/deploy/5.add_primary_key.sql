-- Deploy my_family_goal:5.add_primary_key to pg

BEGIN;

ALTER TABLE "user_has_family"
ADD PRIMARY KEY (user_id, family_id);

COMMIT;
