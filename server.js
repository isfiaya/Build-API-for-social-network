const express = require("express");
const bodyParser = require("body-parser");
const cors = require('cors');
require("dotenv").config();
const path = require('path');
const app = express();

app.use(cors());

// parse requests of content-type: application/json
app.use(bodyParser.json());

// parse requests of content-type: application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// Import Routes
const userRoutes = require("./routes/users.routes.js");
const postRoutes = require("./routes/post.routes.js");
const likeRoutes = require("./routes/like.routes.js");

// Route MiddLewares
app.use('/images', express.static(path.join(__dirname, 'images')));
app.use(userRoutes);
app.use(postRoutes);
app.use(likeRoutes);




// set port, listen for requests
app.listen(3000, () => {
    console.log("Server is running on port 3000.");
});