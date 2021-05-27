const connection = require('../config/db.config')
const { signupValidation, loginValidation } = require('../validation');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

exports.signup = async (req, res) => {

  // Validate the data 
  const { error } = signupValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  // Hash passwords
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  // constructor
  const Users = function (user) {
    this.first_name = user.first_name;
    this.last_name = user.last_name;
    this.email = user.email;
    this.password = user.password;
  };

  // Creat New User
  const user = new Users({
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email,
    password: hashedPassword,
  });

  // Save user in the database
  connection.query("INSERT INTO users SET ?", user, (error, result) => {
    if (error) {
      console.log("error:", err);
      res.status(400).json({
        message: error
      })
    }
    if (result) {
      res.status(200).json({
        message: "Account successfully created "
      })
    }
  });
};


exports.login = async (req, res) => {
  // Validate the data 
  const { error } = loginValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const email = req.body.email;
  const password = req.body.password;

  // Checking if the email exists and match password
  connection.query('SELECT * FROM users WHERE email=?', [email], async (error, results) => {
    if (error) {
      res.send({ "failed": "ocurred" })
    }
    if (results.length) {
      // Checking Password
      const comparision = await bcrypt.compare(password, results[0].password)
      // Create a token  
      const token = jwt.sign({ id: results[0].id }, process.env.TOKEN_SECRET)
      res.header('Authorization', token);

      if (comparision) {
        res.send({
          "first_name": results[0].first_name,
          "last_name": results[0].last_name,
          "email": results[0].email,
          "id": results[0].id,
          "success": "login sucessfull",
          "token": token
        })
      }
      else {
        res.status(400).json("password does not match")
      }
    }
    else {
      res.status(400).send("Email doesn't exist")
    }
  })
};

exports.getAlltUsers = async (req, res) => {
  // const id = req.body.userId;
  connection.query("SELECT * FROM users ", (err, results) => {
    if (err) {
      console.log(err);
      res.status(400).json("you can't get the users")
    }
    if (results) {
      res.status(200).json(results)
    }
  })
}

exports.submitUserImage = async (req, res) => {
  const url = req.protocol + '://' + req.get('host');
  const image = url + '/images/' + req.file.filename;
  const id = req.body.id;

  connection.query("UPDATE users SET imageUser = ? WHERE id = ?", [image, id], (error, results) => {
    if (error) {
      res.send({
        message: "you can't update the images",
        error: error
      })
    }
    if (results) {
      res.send("your image update successfully !")
    }
  })
}

exports.deleteImageProfile = async (req, res) => {
  const id = req.body.id;
  connection.query("UPDATE users SET imageUser = NULL WHERE id = ?", id, (error, results) => {
    if (error) {
      res.send(error)
    }
    if (results) {
      res.send("image profile deleted !")
    }
  })
}