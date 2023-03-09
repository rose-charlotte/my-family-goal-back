-- Revert my_family_goal:6.update_function from pg

BEGIN;

DROP FUNCTION getFamilyById, getUserById;

CREATE FUNCTION getFamilyById(familyId INT) RETURNS family_infos AS $$
		SELECT id, name, (
				SELECT json_agg(
					json_build_object(
						'id', id,
						'title', title,
						'description', description,
						'gain', gain,
						'isComplete', "isComplete",
						'family_id', family_id
					)
				) AS tasks
				FROM task
				WHERE family_id = familyId
			),
			(
				SELECT json_agg(
					json_build_object(
						'id', id,
						'title', title,
						'price', price,
						'isPurchase', "isPurchase",
						'family_id', family_id
					)
				) AS rewards
				FROM reward
				WHERE family_id = familyId
			),
			(
				SELECT json_agg(
					json_build_object(
						'id', id,
						'firstname', firstname,
						'lastname', lastname,
						'pseudo', pseudo,
						'email', email,
						'isParent', "isParent",
						'credit', credit
					)
				) AS members
				FROM "user"
				JOIN user_has_family ON user_id = "user".id
				WHERE family_id = familyId
			)
		FROM FAMILY
		WHERE family.id = familyId;
$$ LANGUAGE sql;

CREATE FUNCTION getUserById(userId INT) RETURNS user_infos AS $$
	SELECT id, firstname, lastname, pseudo, email, (
		SELECT json_agg(
			json_build_object(
				'id', id,
				'name', name,
				'credit', credit,
				'isParent', "isParent"
			)
		) AS families
		FROM family
		JOIN user_has_family ON family.id = family_id
		WHERE user_id = userId
	)
	FROM "user"
	WHERE id = userId;
$$ LANGUAGE sql;

COMMIT;
