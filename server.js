const express = require("express");
const bodyParser = require("body-parser");
const cors = require('cors');
require("dotenv").config();
const path = require('path');
const app = express();

app.use(cors({ origin: '*' }));
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

// parse requests of content-type: application/json
app.use(bodyParser.json());

// parse requests of content-type: application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// Import Routes
const userRoutes = require("./routes/users.routes.js");
const postRoutes = require("./routes/post.routes.js");
const likeRoutes = require("./routes/like.routes.js");
const commentRoutes = require("./routes/comment.routes");

// Route MiddLewares
app.use('/images', express.static(path.join(__dirname, 'images')));
app.use(userRoutes);
app.use(postRoutes);
app.use(likeRoutes);
app.use(commentRoutes);




// set port, listen for requests
app.listen(3000, () => {
    console.log("Server is running on port 3000.");
});