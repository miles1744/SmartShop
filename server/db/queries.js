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
    `SELECT id FROM categories WHERE name ILIKE $1`,
    [searchTerm]
  );

  if (categoryMatch.rows.length > 0) {
    const categoryId = categoryMatch.rows[0].id;

    const { rows } = await pool.query(
      `SELECT groceries.*, categories.name AS category
       FROM groceries
       JOIN categories ON groceries.categoryid = categories.id
       WHERE groceries.categoryid = $1`,
      [categoryId]
    );

    return rows;
  } else {
    const { rows } = await pool.query(
      `SELECT groceries.*, categories.name AS category
       FROM groceries
       JOIN categories ON groceries.categoryid = categories.id
       WHERE groceries.item ILIKE $1`,
      [`%${searchTerm}%`]
    );
    return rows;
  }
}


async function insertGroceries(item) {
    await pool.query("INSERT INTO groceries (item) VALUES ($1)", [item]);
}

async function deleteGrocery(name) {
      await pool.query(
        `DELETE FROM groceries WHERE name ILIKE $1`,
        [name]
      );
  }
  
  async function deleteCategory(name) {
      await pool.query(
        `DELETE FROM categories WHERE name ILIKE $1`,
        [name]
      )
  }
  


async function getItemById(id) {
    const result = await pool.query("SELECT * FROM groceries WHERE id = $1", [id]);
    return result.rows
}

module.exports = {
    getAllGroceries,
    insertGroceries,
    deleteCategory,
    getItemById,
    getAllCategories,
    getCatergoriesAndGroceries,
    deleteGrocery
};