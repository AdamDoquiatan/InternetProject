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

CREATE TABLE posts (
  post_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  user_img_url VARCHAR(2083) NOT NULL,
  subject VARCHAR(99) NOT NULL,
  content TEXT NOT NULL,
  created_at DATETIME DEFAULT NOW() NOT NULL,
  topic VARCHAR(40) NOT NULL,
  reply_count INT DEFAULT 0 NOT NULL
);

CREATE TABLE replies (
  reply_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  post_id INT NOT NULL,
  user_id INT NOT NULL,
  user_img_url VARCHAR(2083) NOT NULL,
  content TEXT NOT NULL,
  created_at DATETIME DEFAULT NOW() NOT NULL
);

CREATE TABLE convos (
  convo_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  user1_id INT NOT NULL,
  user2_id INT NOT NULL,
  user2_img_url VARCHAR(2083) NOT NULL,
  updated_at DATETIME DEFAULT NOW() NOT NULL
);

CREATE TABLE messages (
  message_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  convo_id INT NOT NULL,
  user_id INT NOT NULL,
  user_img_url VARCHAR(2083) NOT NULL,
  content TEXT NOT NULL,
  created_at DATETIME DEFAULT NOW() NOT NULL
);



-- OTHER --

-- Creates a new user --
INSERT INTO users (email, password, full_name, bio, img_url, country, date_of_birth)
  VALUES('testemail', 'testpassword', 'testfull_name', 'testbio', 'testimgurul', 'testcountry', '2020-01-01');

-- Gets a user id based on email and password (for login validation) --
SELECT user_id FROM users WHERE email = 'adamdoq@gmail.com' && password = 'password';

-- Gets a user's profile (everything except the user_id, email, and password) --
SELECT full_name, bio, img_url, country, date_of_birth, post_count, message_count, like_count FROM users WHERE user_id = 36;

-- Create a post --
INSERT INTO posts (user_id, user_img_url, subject, content, topic) VALUES (36, 'testURL', 'test subject', 'test content', 'test topic');

-- Get Last five discussions (ones user 36 has either created or replied to-- 
SELECT p.post_id, p.user_id, p.user_img_url, p.subject, p.content, p.created_at, p.topic, p.reply_count FROM posts AS p
LEFT JOIN replies AS r
ON r.user_id = p.user_id
WHERE p.user_id = 36 OR r.user_id = 36
ORDER BY created_at DESC LIMIT 5;


-- Get last five posts --
-- SELECT * FROM posts WHERE user_id = 36 ORDER BY created_at DESC LIMIT 5;