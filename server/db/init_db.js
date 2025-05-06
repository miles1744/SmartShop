

const { Client } = require("pg");

const SQL = `
CREATE TABLE IF NOT EXISTS groceries (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    item VARCHAR (255)
    price NUMERIC(10, 2),
    quantity INTEGER,
    category VARCHAR(100)
);

INSERT INTO groceries (username)
VALUES
    ('Vital Farms Pasture-Raised Large Eggs', 5.92, 100, 'dairy'),
    ('Horizon Organic Whole Milk', 5.49, 100, 'dairy'),
    ('Nature's Own Butterbread Bread', 3.42, 100, 'grain');
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