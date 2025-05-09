const { Router } = require("express");
const groceryController = require("../controllers/groceryController");
const groceriesRouter = Router();


groceriesRouter.get("/categories", groceryController.categoriesListGet);
groceriesRouter.get("/groceries", groceryController.groceryListGet)
groceriesRouter.get("/search", groceryController.CategoriesAndGroceriesListGet)
groceriesRouter.post("/groceries/new", groceryController.insertGroceries);
groceriesRouter.post("/categories/new", groceryController.insertCategories);
groceriesRouter.post("/categories", groceryController.deleteCategory);
groceriesRouter.post("/groceries", groceryController.deleteGroceries);
groceriesRouter.get("/categories/:id", groceryController.getCategoryById);
groceriesRouter.get("/groceries/:id", groceryController.getGroceryById);
groceriesRouter.put("/groceries/:id", groceryController.updateGrocery);


module.exports = groceriesRouter;
