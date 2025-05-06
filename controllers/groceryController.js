const db = require("../db/queries.js")


exports.usersListGet = async (req, res) => {
    const { search } = req.query;
    const usernames = await db.getAllGroceries(search);
    res.render("index", { usernames }); // change this route using react
}

exports.usersNewGet = async (req, res) => {
    res.render("new") // change this route using react
}

exports.getItemById = async (req, res) =>{

    const id = parseInt(req.params.id);

    try {
        const messages = await db.getItemById(id); 
        const message = messages[0];

        if (!message) {
            return res.status(404).send("Message not found");
        }

        res.render("message", {
            title: "Mini Message Board",
            message
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