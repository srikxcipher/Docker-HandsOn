CREATE DATABASE IF NOT EXISTS hands_on;

USE hands_on;

CREATE TABLE IF NOT EXISTS welcome_note (
  id INT AUTO_INCREMENT PRIMARY KEY,
  note VARCHAR(255)
);

INSERT INTO welcome_note(note) VALUES ("🎉 You are inside a persistent MySQL container!");
