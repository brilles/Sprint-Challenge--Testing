const router = require('express').Router();
const Games = require('./games-model.js');

router.post('/', async (req, res) => {
  const game = req.body;

  if (game.title && game.genre) {
    try {
      const insertedGame = await Games.insert(game);
      res.status(201).json(insertedGame);
    } catch (error) {
      if (error.errno === 19) {
        console.error(error);
        res.status(405).json({ message: 'No duplicates allowed.' });
      } else {
        console.error(error);
        res.status(500).json({ message: 'Error adding game.' });
      }
    }
  } else {
    res.status(422).json({ message: 'Must provide title and genre fields.' });
  }
});

router.get('/', async (req, res) => {
  try {
    const games = await Games.get();
    res.status(200).json(games);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error retrieving games.' });
  }
});

module.exports = router;
