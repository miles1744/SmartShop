const { Router } = require("express");
const groceryController = require("../controllers/groceryController");
const groceriesRouter = Router();


groceriesRouter.get("/categories", groceryController.categoriesListGet);
groceriesRouter.get("/groceries", groceryController.groceryListGet)
groceriesRouter.get("/search", groceryController.CategoriesAndGroceriesListGet)
groceriesRouter.post("/groceries/new", groceryController.insertGroceries);
groceriesRouter.post("/categories/new", groceryController.insertCategories);
groceriesRouter.post("/categories", groceryController.deleteCategory);
groceriesRouter.post("/groceries", groceryController.groceryListGet)



module.exports = groceriesRouter;
