const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'ecommerce',
  password: 'postgres', 
  port: 5432
});


app.post('/orders', async (req, res) => {
  const { customer_name, total_amount, tax, shipping_cost } = req.body;

  try {
    const result = await pool.query(
      `INSERT INTO orders (customer_name, total_amount, tax, shipping_cost)
       VALUES ($1, $2, $3, $4) RETURNING *`,
      [customer_name, total_amount, tax, shipping_cost]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).send('Database insert error');
  }
});

app.get('/orders', async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT * FROM orders');
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).send('Database error');
  }
});


app.delete('/orders/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query('DELETE FROM order_items WHERE order_id = $1', [id]);

   
    await pool.query('DELETE FROM orders WHERE id = $1', [id]);

    res.status(200).send('Order and related items deleted');
  } catch (err) {
    console.error(err);
    res.status(500).send('Error deleting order');
  }
});



app.listen(3000, () => {
  console.log('✅ Server running on http://localhost:3000');
});
