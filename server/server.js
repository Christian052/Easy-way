const express = require('express');
const multer = require('multer');
const path = require('path');
const mysql = require('mysql2');
const cors = require('cors');
const fs = require('fs');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
// const { default: HomeContent } = require('../src/component/HomeContent');

const app = express();
const port = 5000;

// Setup CORS and body parser
app.use(cors());
app.use(express.json());

// MySQL Database Connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'easy-ways',
});

db.connect((err) => {
    if (err) throw err;
    console.log('Connected to MySQL database.');
});

// Setup Multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads');
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    },
});

const upload = multer({ storage });

// Ensure the uploads folder exists
const uploadsDir = './uploads';
if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir);
}

// Serve uploaded images statically
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// =================== Authentication Management ===================

// API Endpoint for User Signup
app.post("/api/signup", async (req, res) => {
    const { full_name, email, password } = req.body;

    // Check if the email already exists in the database
    db.query("SELECT * FROM users WHERE email = ?", [email], async (err, results) => {
        if (err) {
            console.error("Database error:", err);
            return res.status(500).json({ message: "Database error" });
        }

        if (results.length > 0) {
            return res.status(400).json({ message: "Email already exists" });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Insert the new user into the database
        db.query(
            "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
            [full_name, email, hashedPassword],
            (err) => {
                if (err) {
                    console.error("Database error:", err);
                    return res.status(500).json({ message: "Error registering user" });
                }
                res.status(201).json({ message: "User registered successfully" });
            }
        );
    });
});

// API Endpoint for User Login
app.post('/api/login', (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'Please provide email and password.' });
    }

    const sql = 'SELECT * FROM users WHERE email = ?';

    db.query(sql, [email], async (err, results) => {
        if (err) {
            console.error('Database error:', err);
            return res.status(500).json({ message: 'Error logging in.', error: err });
        }

        if (results.length === 0) {
            return res.status(401).json({ message: 'Invalid email or password.' });
        }

        const user = results[0];
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid email or password.' });
        }

        const token = jwt.sign({ id: user.id }, 'your_jwt_secret', { expiresIn: '1h' });
        res.json({
            token,
            userId: user.id
        });
    });
});

// =================== Book Management ===================

// API Endpoint to Get Books
app.get('/api/books', (req, res) => {
    const sql = 'SELECT * FROM books';

    db.query(sql, (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: 'Error fetching books.' });
        }

        res.status(200).json(results);
    });
});

// API Endpoint to Add Book (with image upload)
app.post('/api/books', upload.single('image'), (req, res) => {
    const { name, description } = req.body;
    const imageUrl = req.file ? `/uploads/${req.file.filename}` : null;

    if (!name || !description || !req.file) {
        return res.status(400).json({ message: 'Please provide name, description, and image.' });
    }

    const sql = 'INSERT INTO books (name, description, image_url) VALUES (?, ?, ?)';
    const values = [name, description, imageUrl];

    db.query(sql, values, (err, result) => {
        if (err) {
            console.error('Database error:', err);
            return res.status(500).json({ message: 'Error adding book.', error: err });
        }

        res.status(201).json({ message: 'Book added successfully!', bookId: result.insertId });
    });
});

// =================== User Management ===================

// API Endpoint to Get Users
app.get('/api/users', (req, res) => {
    const sql = 'SELECT * FROM users';

    db.query(sql, (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: 'Error fetching users.' });
        }

        res.status(200).json(results);
    });
});

// =================== Settings Management ===================

// API Endpoint to Get Settings
app.get('/api/settings', (req, res) => {
    const sql = 'SELECT * FROM settings LIMIT 1';

    db.query(sql, (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: 'Error fetching settings.' });
        }

        res.status(200).json(results[0]);
    });
});

// Start the server
const server = app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

// Handle server errors (e.g., port in use)
server.on('error', (error) => {
    if (error.code === 'EADDRINUSE') {
        console.error(`Port ${port} is already in use. Please use a different port.`);
        process.exit(1);
    } else {
        console.error('Server error:', error);
    }
});
