const { Router } = require("express");
const groceryController = require("../controllers/groceryController");
const usersRouter = Router();

usersRouter.get("/", groceryController.usersListGet);
usersRouter.get("/:id", groceryController.getItemById);
usersRouter.get("/new", groceryController.usersNewGet);
usersRouter.post("/new", groceryController.usersNewPost);
usersRouter.post("/delete", groceryController.deleteUsers)


module.exports = usersRouter;
