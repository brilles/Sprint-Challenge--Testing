const db = require('../data/dbConfig.js');

module.exports = {
  insert,
  get,
  getByTitle
};

async function insert(game) {
  const [id] = await db('games').insert(game);
  return db('games')
    .where({ id })
    .first();
}

function get() {
  return db('games');
}

function getByTitle(title) {
  return db('games')
    .where({ title })
    .first();
}
