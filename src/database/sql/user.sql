-- User Table
CREATE TABLE IF NOT EXISTS User (
    userId INT AUTO_INCREMENT PRIMARY KEY,
    userName VARCHAR(255) NOT NULL,
    userOrder VARCHAR(255) NOT NULL,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=INNODB;

-- List table
SELECT * FROM User 


-- Select
SELECT * FROM User 
WHERE user_id=1;

-- Insert
INSERT INTO User (user_name)
VALUES ('Davis');

-- Update
UPDATE User 
SET user_name = 'kevin'
WHERE user_id = 1;

-- Delete
DELETE from User 
WHERE user_id = 16;