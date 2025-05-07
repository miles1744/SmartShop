

const { Client } = require("pg");

const SQL = `

CREATE TABLE IF NOT EXISTS groceries (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    item VARCHAR (255) NOT NULL,
    price NUMERIC(10, 2) NOT NULL,
    quantity INTEGER NOT NULL,
    categoryid INTEGER REFERENCES categories(id)
);

CREATE TABLE IF NOT EXISTS categories (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    name VARCHAR(255) NOT NULL,
    description VARCHAR(255) NOT NULL,
);

INSERT INTO categories (name)
VALUES 
    ('dairy'),
    ('grain');

INSERT INTO groceries (item, price, quantity, categoryid)
VALUES
    ('Vital Farms Pasture-Raised Large Eggs', 5.92, 100, 1),
    ('Horizon Organic Whole Milk', 5.49, 100, 1),
    ('Nature''s Own Butterbread Bread', 3.42, 100, 2);
`;

async function main() {

    console.log("seeding...")

    const client = new Client({
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        database: process.env.DB_NAME,
    });

    await client.connect();
    await client.query(SQL);
    await client.end();

    console.log("done")
}

main();