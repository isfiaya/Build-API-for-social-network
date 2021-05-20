const express = require("express");
const router = express.Router();
const users = require("../controllers/users.controller.js");


router.post("/signup", users.signup);

router.post("/login", users.login);


module.exports = router;