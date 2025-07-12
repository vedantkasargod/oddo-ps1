-- Update the users table to include all fields from the signup form
-- Run this SQL in your MySQL database

-- First, let's see the current table structure
DESCRIBE users;

-- Drop the existing table if it exists (WARNING: This will delete all existing data)
DROP TABLE IF EXISTS users;

-- Create the new users table with all required fields
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    firstName VARCHAR(100) NOT NULL,
    lastName VARCHAR(100) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    location VARCHAR(255),
    profession VARCHAR(255),
    skills JSON,
    seeking JSON,
    agreeToTerms BOOLEAN DEFAULT FALSE,
    agreeToMarketing BOOLEAN DEFAULT FALSE,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Add indexes for better performance
CREATE INDEX idx_email ON users(email);
CREATE INDEX idx_profession ON users(profession);
CREATE INDEX idx_location ON users(location);

-- Verify the table structure
DESCRIBE users;

-- Optional: Insert a test user to verify everything works
-- INSERT INTO users (firstName, lastName, email, password, location, profession, skills, seeking, agreeToTerms, agreeToMarketing) 
-- VALUES ('Test', 'User', 'test@example.com', 'password123', 'New York, USA', 'Software Engineer', '["React", "JavaScript"]', '["Python", "Machine Learning"]', true, false); 