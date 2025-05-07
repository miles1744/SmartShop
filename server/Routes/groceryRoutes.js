const { Router } = require("express");
const groceryController = require("../controllers/groceryController");
const groceriesRouter = Router();


groceriesRouter.get("/categories", groceryController.categoriesListGet);
groceriesRouter.get("/groceries", groceryController.groceryListGet)
groceriesRouter.get("/categories/new", groceryController.usersNewGet);
groceriesRouter.post("/groceries/new", groceryController.usersNewPost);
groceriesRouter.post("/delete", groceryController.deleteItem)


module.exports = groceriesRouter;
