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

app.get('/shipping', (req, res) => {
  const weight = parseFloat(req.query.weight);
  const cost = weight * 2; // Basit hesaplama

  res.json({
    shipping: {
      carrier: 'UPS',
      address: {
        name: 'Default Name',
        phone: '123456789',
        address_line1: 'Shipping St. 123',
        city_locality: 'Istanbul',
        state_province: 'TR',
        postal_code: '34000',
        country_code: 'TR'
      },
      cost: cost
    }
  });
});

app.post('/orders', async (req, res) => {
  const { customer_name, total_amount, tax, shipping } = req.body;

  const client = await pool.connect();
  try {
    await client.query('BEGIN');

    const orderResult = await client.query(
      `INSERT INTO orders (customer_name, total_amount, tax)
       VALUES ($1, $2, $3) RETURNING id`,
      [customer_name, total_amount, tax]
    );

    const orderId = orderResult.rows[0].id;

    await client.query(
      `INSERT INTO shipping 
        (order_id, carrier, name, phone, address_line1, city_locality, state_province, postal_code, country_code, cost)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)`,
      [
        orderId,
        shipping.carrier,
        shipping.address.name,
        shipping.address.phone,
        shipping.address.address_line1,
        shipping.address.city_locality,
        shipping.address.state_province,
        shipping.address.postal_code,
        shipping.address.country_code,
        shipping.cost
      ]
    );

    await client.query('COMMIT');
    res.status(201).json({ success: true, orderId });
  } catch (err) {
    await client.query('ROLLBACK');
    console.error(err);
    res.status(500).send('Error saving order and shipping');
  } finally {
    client.release();
  }
});

app.get('/orders', async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT 
        o.id, o.customer_name, o.total_amount, o.tax,
        s.carrier, s.name AS shipping_name, s.phone, s.address_line1,
        s.city_locality, s.state_province, s.postal_code, s.country_code, s.cost AS shipping_cost
      FROM orders o
      LEFT JOIN shipping s ON o.id = s.order_id
    `);

    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error fetching orders with shipping');
  }
});

app.delete('/orders/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query('DELETE FROM shipping WHERE order_id = $1', [id]);
    await pool.query('DELETE FROM orders WHERE id = $1', [id]);
    res.status(200).send('Order deleted');
  } catch (err) {
    console.error(err);
    res.status(500).send('Error deleting order');
  }
});

app.get('/tax', async (req, res) => {
  try {
    const result = await pool.query('SELECT amount FROM tax LIMIT 1');
    res.json({ tax: result.rows[0] });
  } catch (err) {
    console.error(err);
    res.status(500).send('Tax fetch error');
  }
});

app.listen(3000, () => {
  console.log('✅ Server running on http://localhost:3000');
});
