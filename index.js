const path = require("path");
const express = require("express");
const mongoose = require("mongoose");

const userRoutes = require("./routes/user");

const app = express();

mongoose
    .connect("mongodb://127.0.0.1:27017/punnypages")
    .then(() => console.log("MONGODB CONNECTED"));

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
    res.render("home");
});

app.use("/user", userRoutes);

const PORT = 8080;
app.listen(PORT, () => console.log(`SERVER ON ${PORT}`));
