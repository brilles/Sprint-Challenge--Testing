const db = require('../data/dbConfig.js');
const server = require('../api/server.js');
const request = require('supertest');

describe('games-router.js', () => {
  beforeEach(async () => {
    await db('games').truncate();
  });

  describe('POST /games', () => {
    it('should return status 201 if the fields are complete', async () => {
      const game = {
        title: 'Pacman', // required
        genre: 'Arcade', // required
        releaseYear: 1980 // not required
      };

      const res = await request(server)
        .post('/games')
        .send(game);

      expect(res.status).toBe(201);
    });

    it('should return code 405 Not Allowed if dublicate game', async () => {
      const game1 = {
        title: 'Pacman', // required
        genre: 'Arcade', // required
        releaseYear: 1980 // not required
      };
      const game2 = {
        title: 'Pacman', // required
        genre: 'Arcade', // required
        releaseYear: 1980 // not required
      };

      const res1 = await request(server)
        .post('/games')
        .send(game1);

      const res2 = await request(server)
        .post('/games')
        .send(game2);

      expect(res2.status).toBe(405);
    });

    it('should return status 422 if the fields are incomplete', async () => {
      const game = {
        title: 'Pacman', // required
        releaseYear: 1980 // not required
      };

      const res = await request(server)
        .post('/games')
        .send(game);

      expect(res.status).toBe(422);
    });

    it('should return the new title and genre', async () => {
      const game = {
        title: 'Pacman', // required
        genre: 'Arcade', // required
        releaseYear: 1980 // not required
      };

      const res = await request(server)
        .post('/games')
        .send(game);

      expect(res.body.title).toEqual('Pacman');
      expect(res.body.genre).toEqual('Arcade');
    });
  });

  describe('GET /games', () => {
    it('should return status 200', async () => {
      const res = await request(server).get('/games');

      expect(res.status).toBe(200);
    });

    it('should get games array', async () => {
      const game = {
        title: 'Pacman', // required
        genre: 'Arcade', // required
        releaseYear: 1980 // not required
      };
      await request(server)
        .post('/games')
        .send(game);

      const res = await request(server).get('/games');

      expect(res.body).toEqual([
        { genre: 'Arcade', id: 1, releaseYear: 1980, title: 'Pacman' }
      ]);
    });

    it('should get empty array if no games', async () => {
      const res = await request(server).get('/games');

      expect(res.body).toEqual([]);
    });
  });
});
