const db = require("../db/queries.js")


exports.usersListGet = async (req, res) => {
    const { search } = req.query;
    const items = await db.getAllGroceries(search);
    res.json(items);
}

exports.usersNewGet = async (req, res) => {
    res.render("new") // change this route using react
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