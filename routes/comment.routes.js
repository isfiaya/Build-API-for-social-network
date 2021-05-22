const express = require("express");
const router = express.Router();
const verify = require('../verifyToken');
const comment = require("../controllers/comment.controller")

router.post("/home/comment", verify, comment.submitComment);
router.get("/home/comment", verify, comment.getComment);






module.exports = router;