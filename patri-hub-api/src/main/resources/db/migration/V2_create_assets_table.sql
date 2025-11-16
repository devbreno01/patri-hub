CREATE TABLE assets(
	id BIGSERIAL NOT NULL, 
	name VARCHAR(100), 
	description TEXT,
	category char(1), 
	state_of_conservation char(1), 
	value DECIMAL(10,2),
	photo VARCHAR(200),
	status char(1)
	PRIMARY KEY(id)
); 
