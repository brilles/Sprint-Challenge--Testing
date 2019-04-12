const express = require('express');

const gamesRouter = require('../games/games-router.js');

const server = express();

server.use(express.json());

server.get('/', (req, res) => {
  res.status(200).json({ api: 'up' });
});

server.use('/games', gamesRouter);

module.exports = server;
