const express = require('express');
const mysql = require('mysql2/promise'); // Using the promise-based client for async/await
const cors = require('cors'); // For handling Cross-Origin Resource Sharing

const app = express();
const port = 5000; // The port your backend API will listen on

// --- Middleware ---
// Enable CORS for all origins (for development).
// In production, you should restrict this to your frontend's specific domain:
// app.use(cors({ origin: 'http://your-frontend-domain.com' }));
app.use(cors());

// Enable parsing of JSON request bodies
app.use(express.json());

// --- Database Connection Pool ---
const pool = mysql.createPool({
    host: '172.29.61.234', // Your WSL IP address
    user: 'levelupx_user2', // The new user
    password: 'new_secure_password', // The password you set for levelupx_user2
    database: 'levelupx2' // <--- Make sure this is 'levelupx2' (no space, no other number)
});

// --- Test Database Connection on Startup ---
pool.getConnection()
    .then(connection => {
        console.log('Connected to MySQL database "levelupx" successfully!');
        connection.release(); // Release the connection back to the pool
    })
    .catch(err => {
        console.error('Error connecting to MySQL:', err.message);
        console.error('Please ensure MySQL is running and user credentials/permissions are correct.');
        process.exit(1); // Exit the process if database connection fails
    });

// --- Example API Endpoints ---

// Endpoint to fetch all users
app.get('/api/users', async (req, res) => {
    try {
        // You'll need to have a 'users' table in your 'levelupx' database.
        // Example: CREATE TABLE users (id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(255), email VARCHAR(255) UNIQUE);
        const [rows] = await pool.execute('SELECT * FROM users');
        res.json(rows);
    } catch (err) {
        console.error('Error fetching users:', err);
        res.status(500).json({ error: 'Failed to fetch users', details: err.message });
    }
});

// Endpoint to add a new user (with all fields)
app.post('/api/users', async (req, res) => {
    console.log('Received signup request:', req.body);
    
    const { 
        firstName, 
        lastName, 
        email, 
        password, 
        location, 
        profession, 
        skills, 
        seeking, 
        agreeToTerms, 
        agreeToMarketing 
    } = req.body;
    
    console.log('Extracted fields:', { 
        firstName, 
        lastName, 
        email, 
        password: password ? '[HIDDEN]' : 'MISSING',
        location,
        profession,
        skills,
        seeking,
        agreeToTerms,
        agreeToMarketing
    });
    
    if (!firstName || !lastName || !email || !password) {
        console.log('Validation failed:', { firstName: !!firstName, lastName: !!lastName, email: !!email, password: !!password });
        return res.status(400).json({ error: 'First Name, Last Name, Email, and Password are required' });
    }
    
    try {
        const [result] = await pool.execute(
            `INSERT INTO users (
                firstName, 
                lastName, 
                email, 
                password, 
                location, 
                profession, 
                skills, 
                seeking, 
                agreeToTerms, 
                agreeToMarketing
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [
                firstName, 
                lastName, 
                email, 
                password, 
                location || null, 
                profession || null, 
                JSON.stringify(skills || []), 
                JSON.stringify(seeking || []), 
                agreeToTerms || false, 
                agreeToMarketing || false
            ]
        );
        res.status(201).json({
            message: 'User added successfully',
            userId: result.insertId,
            firstName,
            lastName,
            email
        });
    } catch (err) {
        if (err.code === 'ER_DUP_ENTRY') {
            return res.status(409).json({ error: 'User with this email already exists' });
        }
        console.error('Error adding user:', err);
        res.status(500).json({ error: 'Failed to add user', details: err.message });
    }
});

// Endpoint to login a user
app.post('/api/login', async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ error: 'Email and Password are required' });
    }
    try {
        const [rows] = await pool.execute(
            'SELECT id, firstName, lastName, email, location, profession, skills, seeking, agreeToTerms, agreeToMarketing FROM users WHERE email = ? AND password = ?',
            [email, password]
        );
        if (rows.length === 0) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }
        
        // Parse JSON fields back to arrays
        const user = rows[0];
        if (user.skills) {
            try {
                user.skills = JSON.parse(user.skills);
            } catch (e) {
                user.skills = [];
            }
        }
        if (user.seeking) {
            try {
                user.seeking = JSON.parse(user.seeking);
            } catch (e) {
                user.seeking = [];
            }
        }
        
        res.json({ message: 'Login successful', user });
    } catch (err) {
        console.error('Error during login:', err);
        res.status(500).json({ error: 'Login failed', details: err.message });
    }
});

// Endpoint to update user profile
app.put('/api/users/:id', async (req, res) => {
    const userId = req.params.id;
    const { 
        firstName, 
        lastName, 
        location, 
        profession, 
        skills, 
        seeking, 
        agreeToTerms, 
        agreeToMarketing 
    } = req.body;
    
    try {
        const [result] = await pool.execute(
            `UPDATE users SET 
                firstName = ?, 
                lastName = ?, 
                location = ?, 
                profession = ?, 
                skills = ?, 
                seeking = ?, 
                agreeToTerms = ?, 
                agreeToMarketing = ?,
                updatedAt = CURRENT_TIMESTAMP
            WHERE id = ?`,
            [
                firstName, 
                lastName, 
                location || null, 
                profession || null, 
                JSON.stringify(skills || []), 
                JSON.stringify(seeking || []), 
                agreeToTerms || false, 
                agreeToMarketing || false,
                userId
            ]
        );
        
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'User not found' });
        }
        
        res.json({ message: 'Profile updated successfully' });
    } catch (err) {
        console.error('Error updating user profile:', err);
        res.status(500).json({ error: 'Failed to update profile', details: err.message });
    }
});

// --- Start the Server ---
app.listen(port, () => {
    console.log(`Backend API listening at http://localhost:${port}`);
    console.log(`Access the API at: http://localhost:${port}/api/users`);
});