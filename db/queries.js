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
    await pool.query("INSERT INTO groceries (item) VALUES ($1)", [username]);
}

async function deleteUsers() {
    await pool.query("DELETE FROM usernames")
}


module.exports = {
    getAllGroceries,
    insertGroceries,
    deleteUsers
};