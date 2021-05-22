const express = require("express");
const router = express.Router();
const verify = require('../verifyToken');
const comment = require("../controllers/comment.controller")

router.post("/home/comment", verify, comment.submitComment);






module.exports = router;