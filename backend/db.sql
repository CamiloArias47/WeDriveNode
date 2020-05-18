SET DATESTYLE TO DMY;

create table users(
	id SERIAL,
	name varchar(20) NOT NULL,
	lastname varchar(20),
	mail varchar(50),
	picture varchar(120), 
	active boolean default true,
	administrator boolean default false,
	trust boolean default false,
	created date,
	CONSTRAINT primaryKey_idUser PRIMARY KEY(id)
);

create table camera(
	id serial,
	vel numeric(4),
	picture varchar(250),
	coment varchar(500),
	aproved boolean default false,
	userId integer,
	adminId integer,
	created date,
	CONSTRAINT primaryKey_idStation PRIMARY KEY(id),
	CONSTRAINT FK_userCamera FOREIGN KEY(userId) REFERENCES users(id) on delete cascade on update cascade,
	CONSTRAINT FK_adminCamera FOREIGN KEY(adminId) REFERENCES users(id) on delete cascade on update cascade
);

create table stations(
	id serial,
	name varchar(20),
	picture varchar(250),
	coment varchar(500),
	aproved boolean default false,
	userId integer,
	adminId integer,
	created date,
	CONSTRAINT primaryKey_idCamera PRIMARY KEY(id),
	CONSTRAINT FK_userStation FOREIGN KEY(userId) REFERENCES users(id) on delete cascade on update cascade,
	CONSTRAINT FK_adminStation FOREIGN KEY(adminId) REFERENCES users(id) on delete cascade on update cascade
);

create table combustibles(
	id serial PRIMARY KEY,
	name varchar(20)
);

CREATE TABLE prices(
	stationId integer,
	combustibleId integer,
	price numeric(6),
	CONSTRAINT primaryKey_idPrices PRIMARY KEY(stationId, combustibleId),
	CONSTRAINT FK_stationId FOREIGN KEY(stationId) REFERENCES stations(id) on delete cascade on update cascade,
	CONSTRAINT FK_adminStation FOREIGN KEY(combustibleId) REFERENCES combustibles(id) on delete cascade on update cascade
);

CREATE VIEW camerasAprobed AS
SELECT * from camera where aproved = true;

CREATE VIEW stationsAprobed AS
SELECT * from stations 
              inner join prices as p 
              on p.combustibleId = stations.id
         where aproved = true;


insert into users values 
	(1, 'Camilo', 'Arias', 'camillo47@gmail.com', 'camilo.jpg', true, true, true, "05/18/2020"),
	(2, 'Brayan', 'Herrera', 'brayan@gmail.com', 'marc.jpg', true, true, true, '05-18-2020'),
	(3, 'Laura', 'Arias', 'lara@gmail.com', 'marc.jpg', true, false, false, '05-18-2020'),
	(4, 'Vanelope', 'Perez', 'vape@gmail.com', 'marc.jpg', true, false, false, '05-18-2020');