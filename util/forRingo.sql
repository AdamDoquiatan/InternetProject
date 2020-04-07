 -- Make sure your tables look like this --
CREATE TABLE convos (
  convo_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  user1_id INT NOT NULL,
  user2_id INT NOT NULL,
  user2_img_url VARCHAR(2083) NOT NULL,
  subject VARCHAR(255) NOT NULL,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE messages (
  message_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  convo_id INT NOT NULL,
  sender_user_id INT NOT NULL,
  reciever_user_id INT NOT NULL,
  sender_full_name VARCHAR(99) NOT NULL,
  sender_user_img_url VARCHAR(2083) NOT NULL,
  subject VARCHAR(255),
  content TEXT NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);


-- Creates a convo + create a new message + increments message count for that convo --
INSERT INTO convos (user1_id, user2_id, user2_img_url, subject) VALUES (2, 1, 'testURL', 'testSubject');
INSERT INTO messages (convo_id, sender_user_id, reciever_user_id, sender_full_name, sender_user_img_url, subject, content) VALUES (1, 2, 1, 'Fake McFakey', 'testURL', 'testsubject', 'testcontent');

UPDATE users
SET message_count = message_count + 1
WHERE user_id = 1;

-- Creates a new message --
INSERT INTO messages (convo_id, sender_user_id, reciever_user_id, sender_full_name, sender_user_img_url, subject, content) VALUES (1, 1, 2, 'Fakey McFake', 'testURL', 'testsubject', 'testcontent');
