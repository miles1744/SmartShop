const pool = require("./pool")

async function getAllGroceries(){
    const {rows} = await pool.query(
        "SELECT * FROM groceries"
    )
    return rows
}



async function getAllCategories(){
    const { rows } = await pool.query(
        "SELECT * FROM categories"
    )
    return rows
}

async function getCatergoriesAndGroceries(searchTerm) {

const categoryMatch = await pool.query(
    `SELECT DISTINCT category FROM groceries WHERE category ILIKE $1`,
    [searchTerm]
  );
  
  if (categoryMatch.rows.length > 0) {

    const { rows } = await pool.query(
      `SELECT * FROM groceries WHERE category ILIKE $1`,
      [searchTerm]
    );
    return rows;
  } 
  
  else {
    const { rows } = await pool.query(
      `SELECT * FROM groceries WHERE item ILIKE $1`,
      [`%${searchTerm}%`]
    );
    return rows;
  }
  
}

async function insertGroceries(item) {
    await pool.query("INSERT INTO groceries (item) VALUES ($1)", [item]);
}

async function deleteGrocery(name) {
    try {
      await pool.query(
        `DELETE FROM Item WHERE name ILIKE $1`,
        [name]
      );
      console.log(`${name} item(s) deleted`);
    } catch (err) {
      console.error("Error deleting item:", err);
    }
  }
  
  async function deleteCategory(name) {
    try {
      await pool.query(
        `DELETE FROM Category WHERE name ILIKE $1`,
        [name]
      );
      console.log(`${name} category deleted (with all related items)`);
    } catch (err) {
      console.error("Error deleting category:", err);
    }
  }
  


async function getItemById(id) {
    const result = await pool.query("SELECT * FROM groceries WHERE id = $1", [id]);
    return result.rows
}

module.exports = {
    getAllGroceries,
    insertGroceries,
    deleteItem,
    getItemById,
    getAllCategories,
    getCatergoriesAndGroceries
};