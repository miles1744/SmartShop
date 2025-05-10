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


  async function insertGroceries(item, price, quantity, categoryid) {
    await pool.query(
      "INSERT INTO groceries (item, price, quantity, categoryid) VALUES ($1, $2, $3, $4)",
      [item, price, quantity, categoryid]
    );
  }


  async function insertCategories(name, description) {
    await pool.query(
      "INSERT INTO categories (name, description) VALUES ($1, $2)",
      [name, description]
    );
  }

  async function deleteGrocery(id) {
      await pool.query(
        `DELETE FROM groceries WHERE id = $1`,
        [id]
      );
  }
  
  async function deleteCategory(id) {
      await pool.query(
        `DELETE FROM categories WHERE id = $1`,
        [id]
      )
  }
  


  async function getCategoryById(id) {
    const result = await pool.query("SELECT * FROM categories WHERE id = $1", [id]);
    return result.rows[0];
  }


  async function getGroceryById(id) {
    const result = await pool.query("SELECT * FROM groceries WHERE id = $1", [id]);
    return result.rows[0];
  }

  async function updateGrocery(id, item, price, quantity, categoryid) {
    await pool.query(
      `UPDATE groceries
       SET item = $1, price = $2, quantity = $3, categoryid = $4
       WHERE id = $5`,
      [item, price, quantity, categoryid, id]
    );
  }


  async function updateCategory(id, name, description) {
    await pool.query(
      `UPDATE categories
       SET name = $1, description = $2 WHERE id = $3`,
      [name, description, id]
    );
  }
  

  module.exports = {
      getAllGroceries,
      insertGroceries,
      deleteCategory,
      getCategoryById,
      getAllCategories,
      getCatergoriesAndGroceries,
      insertCategories,
      deleteGrocery,
      getGroceryById,
      updateGrocery,
      updateCategory
  };