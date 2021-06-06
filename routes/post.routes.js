const express = require("express");
const router = express.Router();
const post = require("../controllers/post.controller");
// const verify = require('../verifyToken');
const multer = require('../multer-config');


router.post("/home", multer, post.submitPost);

router.get("/home", post.getAllPost);

router.post("/home/profile", post.getSpecificPost);

router.delete("/home", post.deletePost);




module.exports = router;