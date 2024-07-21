
class Gamer {
  constructor (gamerName) {
      this.id = 0;
      this.name = gamerName;
      this.games = [];
  }
}

class NewGame {
  constructor (title, categoryName, gameStatus, lastGameDate) {
    this.title = title,
    this.categoryName = categoryName,
    this.gameStatus = gameStatus,
    this.lastGameDate = lastGameDate
  }
}

//--EXPORT
export { 
  Gamer,
  NewGame
};