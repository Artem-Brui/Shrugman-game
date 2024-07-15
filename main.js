
// import data for readline-sync and lists of movies and books from a another file
const LINK_SPEAKING = require('./game-data/speaking.json');
const LINK_TITLES = require('./game-data/titles.json');

var readlineSync = require('readline-sync');

const movies = [...LINK_TITLES.movies];
const books = [...LINK_TITLES.books];
//==============

// speaking
//==============

console.clear();
function greetingGame() {
  console.clear();

  const greetingGame = `${LINK_SPEAKING.greeting}\n\n${LINK_SPEAKING.nameCheker}`;

  var startGame = readlineSync.question(greetingGame);
  console.clear();

  return startGame;
}


console.log(greetingGame());





