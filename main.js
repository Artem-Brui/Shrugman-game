

//#region IMPORT DATA for readline-sync and lists of movies and books from a another file

const LINK_SPEAKING = require('./game-data/speaking.json');
const LINK_TITLES = require('./game-data/titles.json');
const LINK_PICTURES = require('./game-data/pictures.json');

var readlineSync = require('readline-sync');

const movies = [...LINK_TITLES.movies];
const books = [...LINK_TITLES.books];
const gamers = [];

//#endregion ==============

//#region FUNCTION greetingGame() that say hello and get a name of user
function greetingGame() {
  console.clear();
  return `${LINK_PICTURES.welcome}\n\n${LINK_SPEAKING.greeting}\n`;
}
//#endregion ==============

//#region FUNCTION nameIsValid() that check names
const nameIsValid = name => {
  // console.clear();
  console.log(`${LINK_PICTURES.welcome}\n`);

  const pattern = /^[a-zA-Z0-9\-._]+$/; //can use a-z, A-Z, 0-9,"_", "-", "."

  return name.split('').every(character => pattern.test(character));
}
//#endregion ==============

//#region FUNCTION nameChanger() that validate names
function nameChanger() {
  console.clear();
  console.log(`${LINK_PICTURES.welcome}\n`);

  return readlineSync.question(`${LINK_SPEAKING.nameInputMistake}`);
}
//#endregion ==============

//#region FUNCTION isGamerExist() that check is user already exist in the game
function isGamerExist(name) {
  console.clear();
  console.log(`${LINK_PICTURES.welcome}\n`);

}
//#endregion ==============

//#region FUNCTION gameStart() that start game from beginning

const gameStart = () => gameSteps();

//#endregion ==============



//#region FUNCTION gameSteps() go throw all steps of a game
function gameSteps(name) {
  console.log(greetingGame());

  let currentUserName = readlineSync.question(LINK_SPEAKING.nameInputStart);

  while (!nameIsValid(currentUserName)) {
    currentUserName = nameChanger();
  };

  console.clear();
  console.log(LINK_SPEAKING.userNotFound);
}
//#endregion ==============


  
gameStart();






