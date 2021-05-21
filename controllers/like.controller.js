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

// exports.getLikes = async (req,res) =>{
//     const userId = req.body.userId;
//     const postId = req.body.postId;

// connection.query("SELECT * FROM like WHERE postId=?", postId , (error,resluts) =>{
// if(error){
//     res.status(200).json({
//         message: "you can't get the post liked"
//     })
// }

// })
// }