var express = require('express');
var router = express.Router();
var knex = require('../db/knex');
var bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');

// login route
router.post('/login', function(req, res, next) {
  var email = req.body.email;
  var password = req.body.password;
  console.log("in back-end login route!!!");
  // ensure that user exists
  knex('users').where('email', email)
  .then(function(data) {
    // if username does not exist
    console.log("knex return data after login post:", data);
    if (!data.length) {
      return res.status(401).json({
      status: 'fail',
      message: 'Email does not exist'
      });
    } else {
      var user = data[0];
      // if password is correct
      if (comparePassword(password, user.password)) {
        var token = jwt.sign(user, process.env.TOKEN_SECRET, {
          expiresIn: 6000 // expires in 24 hours
        });
        return res.json({
          success: true,
          message: 'Enjoy your token!',
          token: token,
          username: user.name,
          user_id: user.id

        });
      } else { // password is incorrect
        return res.status(401).json({
        status: 'fail',
        message: 'Incorrect password'
        });
      }
    }
  })
  .catch(function(err) {
    return next(err);
  });
});

// registration route
router.post('/register', function(req, res, next) {

  var email = req.body.email;
  var password = req.body.password;
  var username = req.body.username;
  // ensure user does not already exist
  knex('users').where('email', email)
  .then(function(data){
    if(data.length) {
      return res.status(409).json({
      status: 'fail',
      message: 'Email already exists'
      });
    } else { // create new user
      // hash and salt the password
      var hashedPassword = hashPassword(password);

      // add user to db
      knex('users').insert({
        username: username,
        email: email,
        password: hashedPassword,
        admin: false,
        banned: false
      }, '*')
      .then(function(data) {
        console.log("returned data from knex insert", data);
        var user = {
          username: username,
          email: email,
          password: hashedPassword,
          user_id: data[0].id
        };
        var token = jwt.sign(user, process.env.TOKEN_SECRET, {
          expiresIn: 6000
        });
        res.status(200).json({
            status: "Much Success",
            token: token,
            username: user.name,
            user_id: user.user_id
        });
      });
    }
  })
  .catch(function(err){
    return next(err);
  });
});

// ** helpers ** //

// hashes a given password
function hashPassword (password) {
  console.log("hashing password ", password);
  var salt = bcrypt.genSaltSync(10);
  return bcrypt.hashSync(password, salt);
}

// compares a given password with a given hashed password, returns true if the match, false otherwise
function comparePassword(password, hashedpassword) {
    return bcrypt.compareSync(password, hashedpassword);
}

module.exports = router;
