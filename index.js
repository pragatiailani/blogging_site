const path = require("path");
const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");

const userRoutes = require("./routes/user");
const blogRoutes = require("./routes/blog");
const commentRoutes = require("./routes/comment");

const Blog = require("./models/blog");

const {
    checkForAuthenticationCookie,
} = require("./middlewares/authentication");

const app = express();

mongoose
    .connect("mongodb://127.0.0.1:27017/punnypages")
    .then(() => console.log("MONGODB CONNECTED"));

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(checkForAuthenticationCookie("token"));
app.use(express.static(path.resolve("./public")));

app.get("/", async (req, res) => {
    // const allBlogs = await Blog.find({}).sort({ createdAt: -1 }).limit(10);
    const allBlogs = await Blog.find({}).sort({ createdAt: -1 });
    res.render("home", { user: req.user, blogs: allBlogs });
});

app.use("/user", userRoutes);
app.use("/blog", blogRoutes);
app.use("/comment", commentRoutes);

const PORT = 8080;
app.listen(PORT, () => console.log(`SERVER ON ${PORT}`));
