CREATE TABLE bookings (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  address TEXT,
  service TEXT,
  date TEXT,
  time TEXT,
  comment TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);