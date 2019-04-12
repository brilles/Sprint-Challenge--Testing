const express = require('express');

const server = express();

server.get('/', (req, res) => {
  res.status(200).json({ api: 'up' });
});

server.use(express.json());

module.exports = server;
