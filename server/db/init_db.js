require("dotenv").config();


const { Client } = require("pg");

const SQL = `

CREATE TABLE IF NOT EXISTS categories (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    name VARCHAR(255) NOT NULL,
    description VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS groceries (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    item VARCHAR (255) NOT NULL,
    price NUMERIC(10, 2) NOT NULL,
    quantity INTEGER NOT NULL,
    categoryid INTEGER REFERENCES categories(id)
);

-- Insert categories with both name and description
INSERT INTO categories (name, description)
VALUES 
    ('dairy', 'Milk, cheese, yogurt, and other dairy products'),
    ('grain', 'Bread, rice, pasta, and cereal products');

-- Insert groceries referencing valid category IDs
INSERT INTO groceries (item, price, quantity, categoryid)
VALUES
    ('Vital Farms Pasture-Raised Large Eggs', 5.92, 100, 1),
    ('Horizon Organic Whole Milk', 5.49, 100, 1),
    ('Nature''s Own Butterbread Bread', 3.42, 100, 2);

`;

async function main() {
    console.log("Seeding...");

    const client = new Client({
        connectionString: process.env.DATABASE_URL,
        ssl: {
          rejectUnauthorized: false, // Required for Render-hosted databases
        },
      });
      

    await client.connect();
    try {
        await client.query(SQL);
        console.log("Done seeding!");
      } catch (err) {
        console.error("❌ Error during seeding:", err);
      }
      
    await client.end();
}

main();
