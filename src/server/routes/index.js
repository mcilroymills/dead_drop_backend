var express = require('express');
var router = express.Router();
var queries = require('../db/queries/queries');

router.get('/', function(req, res, next) {
  res.render('index');
});

router.get('/getpin/:id', function(req, res, next) {
  queries.getPin(req.params.id)
    .then(function(pin) {
      res.json(pin);
    })
    .catch(function(err) {
      console.log('Error:', err);
      return err;
    });
});

router.get('/getpins', function(req, res, next) {
  queries.getPins()
    .then(function(pins) {
      res.json(pins);
    })
    .catch(function(err) {
      console.log('Error:', err);
      return err;
    });
});

router.get('/getuser/:id', function(req, res, next) {
  queries.getUser(req.params.id)
    .then(function(user) {
      res.json(user);
    })
    .catch(function(err) {
      console.log('Error:', err);
      return err;
    });
});

router.post('/newpin', function(req, res, next) {
  var newPin = req.body;

  //Set pin properties
  newPin.pin_image = '';
  newPin.active = true;
  newPin.missing = false;
  newPin.picked_up = false;
  newPin.dropper_id = req.user.user_id;
  newPin.receiver_id = null;

  queries.addPin(newPin)
    .then(function(id) {
      res.json(id);
    })
    .catch(function(err) {
      console.log('Error:', err);
      return err;
    });
});

router.post('/pickup', function(req, res, next) {

  var pickedupPin = req.body;

  var pin_id = pickedupPin.pin_id;
  delete pickedupPin.pin_id; //Gets rid of pin_id for the update query

  //Set pin properties
  pickedupPin.active = true; //Stays active for a period of time so users can still see it on map
  pickedupPin.missing = false;
  pickedupPin.picked_up = true; //Changes pin color
  pickedupPin.receiver_id = req.user.user_id;

  queries.pickupPin(pin_id, pickedupPin)
    .then(function(id) {
      res.json(id);
    })
    .catch(function(err) {
      console.log('Error:', err);
      return err;
    });
});

module.exports = router;
