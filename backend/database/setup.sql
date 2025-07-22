  CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    customer_name VARCHAR(100),
    total_amount NUMERIC,
    tax NUMERIC,
    shipping_cost NUMERIC
  );

  CREATE TABLE order_items (
    id SERIAL PRIMARY KEY,
    order_id INTEGER REFERENCES orders(id),
    item_name VARCHAR(100),
    price NUMERIC,
    quantity INTEGER
  );


