const { Router } = require("express");
const groceryController = require("../controllers/groceryController");
const groceriesRouter = Router();


groceriesRouter.get("/categories", groceryController.categoriesListGet);
groceriesRouter.get("/groceries", groceryController.groceryListGet)
groceriesRouter.get("/search", groceryController.CategoriesAndGroceriesListGet)
groceriesRouter.post("/groceries/new", groceryController.insertGroceries);
groceriesRouter.post("/delete", groceryController.deleteItem)


module.exports = groceriesRouter;
