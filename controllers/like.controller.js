const connection = require('../config/db.config');


exports.sendLike = async (req, res) => {
    const userId = req.body.userId;
    const postId = req.body.postId;

    connection.query("INSERT INTO likes SET userId=? , postId=?", [userId, postId], (error, results) => {
        if (error) {
            console.log(error);
            return res.status(400).json({
                message: "error in like system"
            })
        }
        if (results) {
            return res.status(200).json({
                message: "thanks for like"
            })
        }
    })
}

exports.getLikes = async (req, res) => {
    const postId = req.body.postId;

    connection.query("SELECT * FROM likes WHERE postId=?", postId, (error, results) => {
        if (error) {
            return res.status(400).json({
                message: error
            })
        }
        if (results) {
            console.log("you get the post liked");
            return res.status(200).send(results)
        }
    })
}