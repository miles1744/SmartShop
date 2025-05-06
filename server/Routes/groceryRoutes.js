const { Router } = require("express");
const groceryController = require("../controllers/groceryController");
const groceriesRouter = Router();

groceriesRouter.get("/", groceryController.usersListGet);
groceriesRouter.get("/:id", groceryController.getItemById);
groceriesRouter.get("/new", groceryController.usersNewGet);
groceriesRouter.post("/new", groceryController.usersNewPost);
groceriesRouter.post("/delete", groceryController.deleteUsers)


module.exports = groceriesRouter;
