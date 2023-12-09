const express = require("express");
const Comment = require("../models/comments");
const router = express.Router();

router.post("/:blogId", async (req, res) => {
    await Comment.create({
        content: req.body.content,
        blogId: req.params.blogId,
        createdBy: req.user.id,
    });
    return res.redirect(`/blog/${req.params.blogId}`)
});

module.exports = router;
