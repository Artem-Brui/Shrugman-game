class Gamer {
  constructor (gamerName) {
      this.id = 0;
      this.name = gamerName;
      this.games = [];
  }

  addNewGame(title, categoryName, gameStatus, lastGameDate) {
    this.games.push({
      title,
      categoryName,
      gameStatus,
      lastGameDate
    })
  }

  updateDateOfGame(title) {
    const gameToUpdate = this.games.find(game => game.title === title);
    const currentDate = new Date().toJSON().slice(0,10).replace(/-/g,'.');
    gameToUpdate.lastGameDate = `${currentDate}`;
  }
}

module.exports = Gamer;