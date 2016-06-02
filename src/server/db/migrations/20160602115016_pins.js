
exports.up = function(knex, Promise) {
  return knex.schema.createTable('pins', function(table){
    table.increments('pin_id');
    table.string('pin_title');
    table.text('pin_description');
    table.text('pin_image');
    table.decimal('latitude', 12, 9);
    table.decimal('longitude', 12, 9);
    table.boolean('active');
    table.boolean('missing');//True if reported "missing"
    table.boolean('picked_up');//True if picked up
    table.integer('dropper_id').references('user_id').inTable('users');
    table.integer('receiver_id').references('user_id').inTable('users');
    table.text('receiver_message');
    table.text('receiver_image');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('pins');
};
