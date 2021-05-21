const express = require("express");
const router = express.Router();
const users = require("../controllers/users.controller.js");
const verify = require('../verifyToken');

router.post("/signup", users.signup);

router.post("/login", users.login);

router.get("/home/users", verify, users.getAlltUsers);

module.exports = router;