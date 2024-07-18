

class Gamer {
  constructor (gamerName) {
      this.id = 0;
      this.name = gamerName;
      this.games = [];
  }
}

class NewGame {
  constructor (title, categoryName, gameStatus, lastGameDate) {
    title,
    categoryName,
    gameStatus,
    lastGameDate
  }
}

module.exports = { 
  Gamer,
  NewGame
};