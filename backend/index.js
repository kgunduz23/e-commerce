const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const pool = new Pool({
  user: 'postgres',
  host: 'db',
  database: 'ecommerce',
  password: 'postgres',
  port: 5432
});

app.get('/', (req, res) => {
  res.send('✅ Backend server is running!');
});

app.post('/shipping', async (req, res) => {
  const shipping = req.body;

  try {
    const result = await pool.query(
      `INSERT INTO shipping 
        (carrier, name, phone, address_line1, city_locality, state_province, postal_code, country_code, base_shipping)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
       RETURNING id`,
      [
        shipping.carrier,
        shipping.name,
        shipping.phone,
        shipping.address_line1,
        shipping.city_locality,
        shipping.state_province,
        shipping.postal_code,
        shipping.country_code,
        shipping.base_shipping
      ]
    );

    res.status(201).json({ message: 'Shipping info saved', id: result.rows[0].id });
  } catch (err) {
    console.error('Shipping POST error:', err.message);
    res.status(500).json({ message: 'Failed to save shipping info' });
  }
});

app.get('/shipping', async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT carrier, name, phone, address_line1, city_locality, state_province, postal_code, country_code, base_shipping
      FROM shipping
      ORDER BY id DESC
      LIMIT 1
    `);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'No shipping info found in DB.' });
    }

    res.json({ shipping: result.rows[0] });
  } catch (err) {
    console.error('Shipping GET error:', err.message);
    res.status(500).json({ message: 'Failed to fetch shipping info from DB.' });
  }
});

app.post('/orders', async (req, res) => {
  const { item_name, quantity, weight, total_amount } = req.body;

  try {
    const result = await pool.query(
      `INSERT INTO orders (item_name, quantity, weight, total_amount)
       VALUES ($1, $2, $3, $4)
       RETURNING id`,
      [item_name, quantity, weight, total_amount]
    );

    res.status(201).json({ message: 'Order saved', id: result.rows[0].id });
  } catch (err) {
    console.error('Orders POST error:', err.message);
    res.status(500).send('Error saving order');
  }
});

app.get('/orders', async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT id, item_name, quantity, weight, total_amount
      FROM orders
      ORDER BY id DESC
    `);

    res.json(result.rows);
  } catch (err) {
    console.error('Orders GET error:', err.message);
    res.status(500).send('Error fetching orders');
  }
});

app.delete('/orders/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query('DELETE FROM orders WHERE id = $1', [id]);
    res.status(200).send('Order deleted');
  } catch (err) {
    console.error('Orders DELETE error:', err.message);
    res.status(500).send('Error deleting order');
  }
});

app.get('/tax', async (req, res) => {
  try {
    const result = await pool.query('SELECT amount FROM tax LIMIT 1');
    res.json({ tax: result.rows[0] });
  } catch (err) {
    console.error('Tax GET error:', err.message);
    res.status(500).send('Tax fetch error');
  }
});

app.listen(3000, () => {
  console.log('✅ Server running on http://localhost:3000');
});
