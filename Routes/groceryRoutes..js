const { Router } = require("express");
const groceryController = require("../controllers/groceryController");
const usersRouter = Router();

usersRouter.get("/", usersController.usersListGet);
usersRouter.get("/new", usersController.usersNewGet);
usersRouter.post("/new", usersController.usersNewPost);
usersRouter.post("/delete", usersController.deleteUsers)


module.exports = usersRouter;
