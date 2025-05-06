const pool = require("./pool")

async function getAllGroceries(searchTerm) {
    if (searchTerm){
        const { rows } = await pool.query(
            "SELECT * FROM groceries WHERE item ILIKE $1",
            [`%${searchTerm}%`]
        );
        return rows;
    }

    else {
        const { rows } = await pool.query("SELECT * FROM groceries");
        return rows 
    }
}

async function insertGroceries(item) {
    await pool.query("INSERT INTO groceries (item) VALUES ($1)", [item]);
}

async function deleteUsers() {
    await pool.query("DELETE FROM groceries")
}

async function getMessageById(id) {
    const result = await pool.query("SELECT * FROM groceries WHERE id = $1", [id]);
    return result.rows
}

module.exports = {
    getAllGroceries,
    insertGroceries,
    deleteUsers,
    getMessageById
};