const connection = require('../config/db.config');


exports.sendLike = async (req, res) => {
    const userId = req.body.userId;
    const postId = req.body.postId;

    // CHECK THE USER IF HE ALREADY LIKE THE POST OR NOT 

    connection.query("SELECT * FROM likes WHERE userId=? AND postId=?", [userId, postId], (error, results) => {
        if (error) {
            console.log(error);
            return res.status(400).json({
                message: "error in like system"
            })
        }
        if (results.length) {
            return res.status(200).json({
                message: "you can't like the same post twice!"
            })
        }
        if (!results.length) {
            connection.query("INSERT INTO likes SET userId=? , postId=?", [userId, postId], (error, results) => {
                if (error) {
                    res.send(error)
                }
                if (results) {
                    res.status(200).send("thanks for like !")
                }
            })
        }
    })
}

exports.getLikes = async (req, res) => {
    const postId = req.body.postId;

    connection.query("SELECT * FROM likes", (error, results) => {
        if (error) {
            return res.status(400).json({
                message: error
            })
        }
        if (results) {
            return res.status(200).send(results)
        }
    })
}