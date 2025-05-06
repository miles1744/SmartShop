const express = require("express");
const app = express();
const groceryRoutes = require("./routes/groceryRoutes");

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use("/", groceryRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Express app listening on port ${PORT}!`));
