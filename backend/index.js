const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');
const validator = require('validator');
require('dotenv').config();

const app = express();
app.use(cors({
  origin: 'https://main.d27q0guhp97k1i.amplifyapp.com',
  credentials: true,
}));

app.use(express.json());
app.use(express.text({ type: 'text/plain' }));


// Database connection configuration
const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  ssl: {
    rejectUnauthorized: false,
  },
});

// GET /newsletter
app.get('/newsletter', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM NEWSLETTER');
    res.status(200).json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// POST /newsletter
app.post('/newsletter', async (req, res) => {
  let email;

  if (typeof req.body === 'string') {
    // Handle raw email string
    email = req.body.trim();
  } else if (typeof req.body === 'object' && req.body !== null && 'email' in req.body) {
    // Handle JSON payload with "email" field
    email = req.body.email;
  } else {
    // Invalid payload format
    return res.status(400).json({ error: 'Invalid payload format' });
  }

  // Validate the email
  if (!email || !validator.isEmail(email)) {
    return res.status(400).json({ error: 'Invalid email address' });
  }

  try {
    await pool.query('INSERT INTO NEWSLETTER (email) VALUES ($1) ON CONFLICT DO NOTHING', [email]);
    res.status(201).json({ message: 'Email added to newsletter' });
  } catch (error) {
    console.error('Error executing query', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
