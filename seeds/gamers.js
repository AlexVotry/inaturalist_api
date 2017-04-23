exports.seed = function(knex, Promise) {
  return Promise.join(
    // Deletes ALL existing entries
    knex('gamers').del(),

    // Inserts seed entries
    knex('gamers').insert({
      username: Alex,
      password: pass
  );
};
