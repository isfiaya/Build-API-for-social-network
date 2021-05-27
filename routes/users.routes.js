const express = require("express");
const router = express.Router();
const users = require("../controllers/users.controller.js");
const verify = require('../verifyToken');
const multer = require('../multer-config');

router.post("/signup", users.signup);

router.post("/login", users.login);

router.get("/home/users", verify, users.getAlltUsers);

router.post("/home/users/images", verify, multer, users.submitUserImage);

router.delete("/home/users/images", verify, users.deleteImageProfile);

module.exports = router;