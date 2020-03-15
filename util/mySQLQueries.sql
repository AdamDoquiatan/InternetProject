-- TABLES --

CREATE TABLE users (
  user_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY ,
  email VARCHAR (99) NOT NULL,
  password VARCHAR (99) NOT NULL,
  full_name VARCHAR (99) NOT NULL,
  bio VARCHAR (99) NOT NULL,
  img_url VARCHAR (2083) NOT NULL,
  country VARCHAR(99) NOT NULL,
  date_of_birth DATETIME NOT NULL,
  post_count INT DEFAULT 0 NOT NULL,
  message_count INT DEFAULT 0 NOT NULL,
  like_count INT DEFAULT 0 NOT NULL
);




-- OTHER --

-- Creates a new user --
INSERT INTO users (email, password, full_name, bio, img_url, country, date_of_birth)
  VALUES('testemail', 'testpassword', 'testfull_name', 'testbio', 'testimgurul', 'testcountry', '2020-01-01');

-- Gets a user id based on email and password (for login validation) --
SELECT user_id FROM users WHERE email = 'adamdoq@gmail.com' && password = 'password';