const { Router } = require("express");
const User = require("../models/user");

const router = Router();

router.get("/signin", (req, res) => {
    return res.render("signin");
});

router.post("/signin", async (req, res) => {
    const { email, password } = req.body;
    // const isMatched = User.matchPassword(email, password);
    const response = await User.matchPassword(email, password);
    return res.redirect("/")
});

router.get("/signup", (req, res) => {
    return res.render("signup");
});

router.post("/signup", async (req, res) => {
    const { fullName, email, password } = req.body;
    await User.create({ fullName, email, password });
    return res.redirect("/")
});

module.exports = router;
