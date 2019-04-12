exports.up = function(knex) {
  return knex.schema.createTable('games', games => {
    games.increments();

    games
      .string('title', 128)
      .notNullable()
      .unique();
    games.string('genre', 128).notNullable();
    games.integer('releaseYear');
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('games');
};
