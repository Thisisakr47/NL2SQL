create table person (
	id BIGSERIAL NOT NULL PRIMARY KEY,
	first_name VARCHAR(50) NOT NULL,
	last_name VARCHAR(50) NOT NULL,
	dept VARCHAR(50)
);
insert into person (id, first_name, last_name, dept) values (1, 'Emma', 'Meininger', 'Automotive');
insert into person (id, first_name, last_name, dept) values (2, 'Donella', 'Shearman', 'Health');
insert into person (id, first_name, last_name, dept) values (3, 'Jasen', 'Elam', null);
insert into person (id, first_name, last_name, dept) values (4, 'Carolee', 'Harman', 'Games');
insert into person (id, first_name, last_name, dept) values (5, 'Trudy', 'Espinas', 'Electronics');
insert into person (id, first_name, last_name, dept) values (6, 'Benji', 'Eaklee', 'Home');
insert into person (id, first_name, last_name, dept) values (7, 'Lisa', 'Rosoman', 'Sports');
insert into person (id, first_name, last_name, dept) values (8, 'Gifford', 'Murrhaupt', 'Books');
insert into person (id, first_name, last_name, dept) values (9, 'Elianora', 'Meehan', 'Baby');
insert into person (id, first_name, last_name, dept) values (10, 'Marmaduke', 'Hadeke', 'Electronics');
