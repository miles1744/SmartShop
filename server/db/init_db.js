require("dotenv").config();
const { Client } = require("pg");

// ✅ Log startup info
console.log("🌱 Starting DB seed...");
console.log("🔗 Using DATABASE_URL:", process.env.DATABASE_URL);

const SQL = `
-- Create categories table
CREATE TABLE IF NOT EXISTS categories (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description VARCHAR(255) NOT NULL
);

-- Create groceries table
CREATE TABLE IF NOT EXISTS groceries (
  id SERIAL PRIMARY KEY,
  item VARCHAR(255) NOT NULL,
  price NUMERIC(10, 2) NOT NULL,
  quantity INTEGER NOT NULL,
  categoryid INTEGER REFERENCES categories(id)
);

-- Insert categories (will error if already inserted without ON CONFLICT handling)
INSERT INTO categories (name, description)
VALUES 
  ('dairy', 'Milk, cheese, yogurt, and other dairy products'),
  ('grain', 'Bread, rice, pasta, and cereal products')
ON CONFLICT DO NOTHING;

-- Insert groceries referencing valid category IDs
INSERT INTO groceries (item, price, quantity, categoryid)
VALUES
  ('Vital Farms Pasture-Raised Large Eggs', 5.92, 100, 1),
  ('Horizon Organic Whole Milk', 5.49, 100, 1),
  ('Nature''s Own Butterbread Bread', 3.42, 100, 2)
ON CONFLICT DO NOTHING;
`;

async function main() {
  const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false, // ✅ Required for Render
    },
  });

  try {
    console.log("🔌 Connecting to DB...");
    await client.connect();

    console.log("📥 Executing seed SQL...");
    await client.query(SQL);

    console.log("✅ Done seeding!");
  } catch (err) {
    console.error("❌ Error during seeding:", err);
  } finally {
    await client.end();
    console.log("🔌 DB connection closed");
  }
}

main();
