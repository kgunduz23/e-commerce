const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

app.get('/order', (req, res) => {
  res.json({
    order: [
      { id: 1, name: "Cool Shirt", price: 25.0, qty: 3, weight: 0.5 },
      { id: 2, name: "Cool Pants", price: 45.0, qty: 2, weight: 1 },
      { id: 3, name: "Light Saber", price: 125.0, qty: 1, weight: 5 }
    ]
  });
});

app.get('/tax', (req, res) => {
  res.json({
    tax: { amount: 0.07 }
  });
});

app.get('/shipping', (req, res) => {
  const weight = parseFloat(req.query.weight || 0);

  res.json({
    shipping: {
      carrier: "UPS",
      address: {
        name: "Amanda Miller",
        phone: "555-555-5555",
        address_line1: "525 S Winchester Blvd",
        city_locality: "San Jose",
        state_province: "CA",
        postal_code: "95128",
        country_code: "US"
      },
      cost: 7.99 + weight * 0.5
    }
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
