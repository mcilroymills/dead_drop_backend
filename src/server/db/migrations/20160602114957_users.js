
exports.up = function(knex, Promise) {
  return knex.schema.createTable('users', function(table){
    table.increments('user_id');
    table.string('username');
    table.string('email');
    table.string('password');
    table.boolean('admin');//true if admin
    table.boolean('banned');//true if banned
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('users');
};
