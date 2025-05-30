const express = require("express");
const app = express();
const groceryRoutes = require("./routes/groceryroutes.js");
const cors = require("cors");

const corsOptions = {
    origin:["http://localhost:5173", "https://smartshop-frontend-382d.onrender.com"],
};

app.use(express.json());

app.use(cors(corsOptions));


app.use(express.urlencoded({ extended: true }));
app.use("/", groceryRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Express app listening on port ${PORT}!`));
