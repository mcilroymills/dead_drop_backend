var bcrypt = require("bcrypt");

exports.seed = function(knex, Promise) {
  return Promise.join(
    // Deletes ALL existing entries
    knex('users').del(),

    knex('users').insert(
      {
        username: '5280Smooth',
        email: 'millsmcilroy@gmail.com',
        password: bcrypt.hashSync('test', 10),
        admin: true,
        banned: false
      }),
    knex('users').insert(
      {
        username: 'GoneGirl87',
        email: 'gonegirl87@gmail.com',
        password: bcrypt.hashSync('test', 10),
        admin: false,
        banned: false
      }),
    knex('users').insert(
      {
        username: 'Funnywiza',
        email: 'fake1@faker.com',
        password: bcrypt.hashSync('test', 10),
        admin: false,
        banned: false
      }),
    knex('users').insert(
      {
        username: '21wavery',
        email: 'fake2@faker.com',
        password: bcrypt.hashSync('test', 10),
        admin: false,
        banned: false
      }),
      knex('users').insert(
      {
        username: 'Hickenlooper93',
        email: 'loop@netscape.net',
        password: bcrypt.hashSync('test', 10),
        admin: false,
        banned: false
      })
  );
};