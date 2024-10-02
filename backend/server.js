const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');
const validator = require('validator');
require('dotenv').config();

const app = express();
const allowedOrigins = [
  'http://localhost:3000', // Local development
  'https://main.d27q0guhp97k1i.amplifyapp.com', // Production
];
app.use(cors({
  origin: allowedOrigins,
  credentials: true,
}));

app.use(express.json());
app.use(express.text({ type: 'text/plain' }));


// Database connection configuration
const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT || 5432,
  user: process.env.DB_USER || "postgres",
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME || "postgres",
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

// GET /nft-discounts
app.get('/nft-discounts', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM NFT_DISCOUNT');
    res.status(200).json(result.rows);
  } catch (error) {
    console.error('Error fetching NFT discounts', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// POST /nft-discounts
app.post('/nft-discounts', async (req, res) => {
  const { nft, discount } = req.body;

  // Validate inputs
  if (!nft || typeof nft !== 'string') {
    return res.status(400).json({ error: 'Invalid NFT identifier' });
  }

  const validDiscounts = ['silver', 'gold', 'pallad'];
  if (!discount || !validDiscounts.includes(discount)) {
    return res.status(400).json({ error: 'Invalid discount level' });
  }

  try {
    const result = await pool.query(
      'INSERT INTO NFT_DISCOUNT (nft, discount) VALUES ($1, $2) RETURNING *',
      [nft, discount]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Error adding NFT discount', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// DELETE /nft-discounts/:id
app.delete('/nft-discounts/:id', async (req, res) => {
  const { id } = req.params;

  // Validate ID
  if (!id || isNaN(parseInt(id))) {
    return res.status(400).json({ error: 'Invalid ID' });
  }

  try {
    const result = await pool.query('DELETE FROM NFT_DISCOUNT WHERE id = $1 RETURNING *', [id]);
    if (result.rowCount === 0) {
      return res.status(404).json({ error: 'NFT discount not found' });
    }
    res.status(200).json({ message: 'NFT discount deleted', deletedItem: result.rows[0] });
  } catch (error) {
    console.error('Error deleting NFT discount', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
