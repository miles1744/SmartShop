const { Router } = require("express");
const groceryController = require("../controllers/groceryController");
const groceriesRouter = Router();


groceriesRouter.get("/categories", groceryController.groceryListGet);
groceriesRouter.get("/groceries", groceryController.getItemById)
groceriesRouter.get("/new", groceryController.usersNewGet);
groceriesRouter.post("/new", groceryController.usersNewPost);
groceriesRouter.post("/delete", groceryController.deleteItem)


module.exports = groceriesRouter;
