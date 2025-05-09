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

exports.usersNewGet = async (req, res) => {
    res.render("new") 
}

exports.getItemById = async (req, res) =>{

    const id = parseInt(req.params.id);

    try {
        const items = await db.getItemById(id); 
        const item = items[0];

        if (!item) {
            return res.status(404).send("Message not found");
        }

        res.render("message", {
            item
        });
    } 
    
    catch (err) {
        console.error("Error fetching message:", err);
        res.status(500).send("Server error");
    }
}

exports.usersNewPost = async (req, res) => {
    const { username } = req.body;
    await db.insertUsername(username);
    res.redirect("/");
}

exports.deleteItem = async(req, res) => {
    await db.deleteUsers();
    res.redirect("/");

}


exports.insertGroceries = async (req, res) => {

    const { item, price, quantity, categoryid } = req.body.newGrocery;
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
        const { name, description } = req.body.newCategory;
        console.log("Extracted fields:", name, description);
    
    
        if (!name || !description) {
          return res.status(400).json({ error: "Missing required fields" });
        }
      
        try {
          await db.insertGroceries(name, description);
          res.status(201).json({ message: "Grocery item inserted successfully!" });
        } catch (err) {
          console.error("Error inserting grocery:", err);
          res.status(500).json({ error: "Internal Server Error" });
        }
  }
  