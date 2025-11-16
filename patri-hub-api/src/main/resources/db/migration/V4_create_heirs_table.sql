CREATE TABLE heirs(
	id BIGSERIAL PRIMARY KEY, 
	user_id BIGINT, 
	name VARCHAR(100), 
	phone_number VARCHAR(30),
	relation VARCHAR(100), 
	CONSTRAINT fk_users_to_heirs 
		FOREIGN KEY(user_id) REFERENCES users(id)
); 
