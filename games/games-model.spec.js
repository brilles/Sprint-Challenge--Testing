const db = require('../data/dbConfig.js');
const Games = require('./games-model.js');

describe('games-model', () => {
  beforeEach(async () => {
    await db('games').truncate();
  });

  describe('insert()', () => {
    it('should insert the provided game', async () => {
      let game = await Games.insert({
        title: 'Pacman', // required
        genre: 'Arcade', // required
        releaseYear: 1980 // not required
      });

      expect(game.title).toBe('Pacman');
      expect(game.genre).toBe('Arcade');

      game = await Games.insert({
        title: 'Lunar Lander', // required
        genre: 'Arcade', // required
        releaseYear: 1979 // not required
      });

      expect(game.title).toBe('Lunar Lander');
      expect(game.genre).toBe('Arcade');
    });
  });

  describe('get()', () => {
    it('should get the games', async () => {
      await Games.insert({
        title: 'Pacman', // required
        genre: 'Arcade', // required
        releaseYear: 1980 // not required
      });

      await Games.insert({
        title: 'Lunar Lander', // required
        genre: 'Arcade', // required
        releaseYear: 1979 // not required
      });

      const games = await Games.get();
      expect(games.length).toBe(2);
    });
  });
});
