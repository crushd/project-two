const authRouter = require("express").Router();

// auth login
authRouter.get("/login", (req, res) => {
    res.render("login");
})

// auth with google
authRouter.get("/google", (req, res) => {
    //use passport here to interact with the googs
    res.send("Logging in with the Googs...")
})

// auth logout
authRouter.get("/logout", (req, res) => {
    // handle with passport
    res.send("Logging out")
})

module.exports = authRouter;