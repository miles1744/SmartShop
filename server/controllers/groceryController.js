const db = require("../db/queries.js")


exports.CategoriesAndGroceriesListGet = async (req, res) => {
    const { term } = req.query;

    if (!term) {
      return res.status(400).json({ error: "Search term is required" });
    }
  
    try {
      const items = await db.getCatergoriesAndGroceries(term);
      res.json(items);
    } catch (err) {
      console.error("Error in /search route:", err);
      res.status(500).json({ error: "Internal server error" });
    }
}

exports.groceryListGet = async (req, res) => {
    const items = await db.getAllGroceries();
    res.json(items);
}

exports.categoriesListGet = async (req, res) => {
    const items = await db.getAllCategories();
    res.json(items);
}

exports.getCategoryById = async (req, res) => {
  const id = parseInt(req.params.id);

  try {
    const item = await db.getCategoryById(id);

    if (!item) {
      return res.status(404).json({ error: "Category not found" });
    }

    res.json(item);
  } catch (err) {
    console.error("Error fetching category:", err);
    res.status(500).json({ error: "Server error" });
  }
};



exports.insertGroceries = async (req, res) => {

  const { item, price, quantity, categoryid } = req.body;
console.log("Extracted fields:", item, price, quantity, categoryid);


    if (!item || !price || !quantity || !categoryid) {
      return res.status(400).json({ error: "Missing required fields" });
    }
  
    try {
      await db.insertGroceries(item, price, quantity, categoryid);
      res.status(201).json({ message: "Grocery item inserted successfully!" });
    } catch (err) {
      console.error("Error inserting grocery:", err);
      res.status(500).json({ error: "Internal Server Error" });
    }
  };

  exports.insertCategories = async (req, res) => {
    const { name, description } = req.body;
    console.log("Extracted fields:", name, description);
    
    
        if (!name || !description) {
          return res.status(400).json({ error: "Missing required fields" });
        }
      
        try {
          await db.insertCategories(name, description);
          res.status(201).json({ message: "Grocery item inserted successfully!" });
        } catch (err) {
          console.error("Error inserting grocery:", err);
          res.status(500).json({ error: "Internal Server Error" });
        }
  }
 
  
  exports.deleteCategory = async (req, res) => {
    const { id } = req.body;
  
    if (!id) {
      return res.status(400).json({ error: "Category name required" });
    }
  
    try {
      await db.deleteCategory(id);
      res.status(200).json({ message: "Category deleted" });
    } catch (err) {
      console.error("Error deleting category:", err);
      res.status(500).json({ error: "Server error" });
    }
  };


  exports.deleteGroceries = async (req, res) => {
    const { id } = req.body;
  
    if (!id) {
      return res.status(400).json({ error: "Grocery name required" });
    }
  
    try {
      await db.deleteGrocery(id);
      res.status(200).json({ message: "Grocery deleted" });
    } catch (err) {
      console.error("Error deleting grocery:", err);
      res.status(500).json({ error: "Server error" });
    }
  };
  
  