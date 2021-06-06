const express = require("express");
const router = express.Router();
// const verify = require('../verifyToken');
const comment = require("../controllers/comment.controller")

router.post("/home/comment", comment.submitComment);
router.get("/home/comment", comment.getComment);
router.delete("/home/comment", comment.deleteComment);
router.post("/home/comment/edit", comment.editComment);






module.exports = router;