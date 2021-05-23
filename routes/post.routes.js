const express = require("express");
const router = express.Router();
const post = require("../controllers/post.controller");
const verify = require('../verifyToken');
const multer = require('../multer-config');


router.post("/home", verify, multer, post.submitPost);

router.get("/home", verify, post.getAllPost);

router.delete("/home", verify, post.deletePost);




module.exports = router;