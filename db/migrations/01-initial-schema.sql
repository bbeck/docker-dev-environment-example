CREATE TABLE messages (
  id SERIAL PRIMARY KEY,
  message varchar NOT NULL CHECK (message <> '')
);