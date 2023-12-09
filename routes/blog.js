const { Router } = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const Blog = require("../models/blog");
const Comment = require("../models/comments");

const router = Router();

const createUserDirectory = (req, res, next) => {
    const userDirectory = path.resolve(`./public/uploads/${req.user.id}`);

    if (!fs.existsSync(userDirectory)) {
        fs.mkdirSync(userDirectory, { recursive: true });
    }

    next();
};

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.resolve(`./public/uploads/${req.user.id}`));
    },
    filename: function (req, file, cb) {
        cb(null, `${Date.now()}-${file.originalname}`);
    },
});

const upload = multer({ storage: storage });

router.get("/add-new", (req, res) => {
    res.render("addBlog", { user: req.user });
});

router.post(
    "/",
    createUserDirectory,
    upload.single("coverImage"),
    async (req, res) => {
        const { title, content } = req.body;
        const blog = await Blog.create({
            title,
            content,
            coverImageURL: `/uploads/${req.user.id}/${req.file.filename}`,
            createdBy: req.user.id,
        });
        // return res.redirect("/");
        return res.redirect(`/blog/${blog._id}`);
    }
);

router.get("/:id", async (req, res) => {
    const blog = await Blog.findById(req.params.id).populate("createdBy");
    const comments = await Comment.find({ blogId: req.params.id }).populate("createdBy");
    return res.render("blog", { user: req.user, blog, comments });
});

module.exports = router;
