CREATE TABLE IF NOT EXISTS orders (
  id SERIAL PRIMARY KEY,
  item_name TEXT NOT NULL,
  quantity INT NOT NULL,
  weight NUMERIC NOT NULL,
  total_amount NUMERIC NOT NULL
);

CREATE TABLE IF NOT EXISTS shipping (
  id SERIAL PRIMARY KEY,
  carrier TEXT,
  name TEXT,
  phone TEXT,
  address_line1 TEXT,
  city_locality TEXT,
  state_province TEXT,
  postal_code TEXT,
  country_code TEXT,
  base_shipping NUMERIC
);

CREATE TABLE IF NOT EXISTS tax (
  amount NUMERIC
);

