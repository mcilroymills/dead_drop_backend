var knex = require('../knex');

module.exports = {
    //Get a single pin
    getPin: function(pin_id) {
        return knex('pins').innerJoin('users', 'users.user_id', 'pins.dropper_id').where('pin_id', pin_id);
    },
    //Get all active pins, user (dropper) & reciever info
    getPins: function() {
        return knex.raw('SELECT p.*, u.username AS dropper, u2.username AS receiver FROM pins p INNER JOIN users u ON u.user_id = p.dropper_id LEFT JOIN users u2 ON u2.user_id = p.receiver_id WHERE p.active = true');
    },
    //Adds a pin to db
    addPin: function(pin){
        return knex('pins').insert(pin);
    },
    //Changes a pin to its picked-up state
    pickupPin: function(pin_id, pin){
        return knex('pins').where('pin_id', pin_id).update(pin);
    },
    //Returns the username of the receiver
    getReceiverName: function(receiver_id){
        return knex.select('username').from('users').where('user_id', receiver_id);
    },
    //Gets all users from the db
    getUsers: function(user){
        return knex('users');
    },
    updateUser: function(user_id, user){
        return knex('users').where('user_id', user_id).update(user);
    },
    getUser: function(user_id) {
      return knex('users').where('user_id', user_id);
    }
};