
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('gamers', table => {
      table.string('username').primary();
      table.string('password');
      table.string('accessToken');
    }),
    knex.schema.createTable('favorites', table => {
      table.string('fID').primary();
      table.string('username').references('username').inTable('gamers').onDelete('cascade');
      table.string('photo_id');
      table.string('picture').defaultTo('unspecified');
      table.string('location').defaultTo('unspecified');
      table.string('uri').defaultTo('unspecified');
      table.string('species');
      table.timestamps();
    })
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
     knex.schema.dropTable('favorites'),
     knex.schema.dropTable('gamers')
  ])
};
