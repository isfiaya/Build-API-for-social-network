const express = require("express");
const router = express.Router();
// const verify = require('../verifyToken');
const like = require("../controllers/like.controller")

router.post("/home/like", like.sendLike);

router.get("/home/like", like.getLikes);





module.exports = router;