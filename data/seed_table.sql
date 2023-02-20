BEGIN;

TRUNCATE TABLE role, "user", family, user_has_family, task, reward RESTART IDENTITY;

INSERT INTO "role"(label) VALUES
('simple_user'),
('parent'),
('child');

INSERT INTO "user"(firstname, lastname, pseudo, email, password, role_id) VALUES
('François', 'GRUNERT', 'Frapuks', 'francoisgrunert@gmail.com', 'adrienLeBg', 3),
('Adrien', 'BLANC', 'AdriBG', 'adrienB@gmail.com', 'JeSuisLePlusBeau', 2),
('Adrien', 'Haggani', 'AdriH', 'adrienH@gmail.com', 'FautQueJeVousRaconteUnTruc', 3),
('Charlotte', 'Rose', 'Zerossama', 'Chacha@gmail.com', 'OclockOuaisOuais', 2),
('Marwane', 'Ben Tekaya', 'Marwenn', 'MBT@gmail.com', '1234', 3),
('Benjamin', 'Nougadère', 'Benjam', 'BNO@gmail.com', 'QuandJeBossaisChezMicrosoft', 1);

INSERT INTO "family"(name) VALUES
('Moaï'),
('Front'),
('Back');

INSERT INTO "user_has_family"(user_id, family_id, credit) VALUES
(1, 1, 100),
(2, 1, 0),
(3, 1, 250),
(4, 1, 0),
(5, 1, 700);

INSERT INTO "task"(title, description, gain, "isComplete", family_id) VALUES
('Faire une page en HTML', null, 200, false, 1),
('faire un site en EJS', 'Et ne surtout pas oublier les commentaires sinon on capte rien', 100, false, 1),
('Déployer', 'Sur le serveur de ton choix, mais comme j''aime bien Elon Musk on pourrait faire sur un serveur AWS', 500, false, 1),
('Faire une SPA en react', 'Faut que ca claque, on est pas là pour rigoler ok ?', 10, false, 2),
('Utiliser axios', null, 50, false, 2),
('Déployer', 'Sur le serveur de ton choix, mais comme j''aime bien Elon Musk on pourrait faire sur un serveur AWS', 100, false, 2),
('Faire un MCD', 'Ne pas utiliser le terme ID, ca doit être lisible pour le client', 1000, false, 3),
('Faire un MLD', 'Si possible en anglais, que ça se rapproche au plus proche ds champs de la BDD', 500, false, 3),
('Déployer', null, 2000, false, 3);


INSERT INTO "reward"(title, price, "isPurchase", family_id) VALUES
('un 3e écran', 1000, false, 1),
('un casque audio', 800, false, 1),
('un stylo et du papier', 100, false, 1),
('un écran 49 pouces', 100, false, 2),
('un clavier qwerty', 70, false, 2),
('un NAS', 200, false, 2),
('un PC linux', 10000, false, 3),
('un 8e écran', 5000, false, 3),
('une cave dans le noir', 90000, false, 3);

COMMIT;