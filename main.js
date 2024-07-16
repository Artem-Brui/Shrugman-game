

//#region IMPORT DATA for readline-sync and lists of movies and books from a another file

const LINK_SPEAKING = require('./game-data/speaking.json');
const LINK_TITLES = require('./game-data/titles.json');
const LINK_PICTURES = require('./game-data/pictures.json');
var readlineSync = require('readline-sync');

//#endregion ==============

//#region VARIABLES 

const movies = [...LINK_TITLES.movies];
const books = [...LINK_TITLES.books];
const gamers = [];

//#endregion ==============

//#region CLASSES 

class newGamer {
  constructor (name, movies,books, lastGameDate) {
      this.name = name;
      this.movies = movies;
      this.books = books;
      this.lastGameDate = lastGameDate;
  }
}

class titlesList {
  constructor (finishedGames, futureGames) {
      this.finishedGames = finishedGames;
      this.futureGames = futureGames;
  }
}

//#endregion ==============

//#region FUNCTION greetingGame() that say hello and get a name of user
function greetingGame() {
  console.clear();
  return `${LINK_PICTURES.smile}\n\n${LINK_PICTURES.welcome}\n\n${LINK_SPEAKING.greeting}\n`;
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

//#region FUNCTION startNewRound() that check is user already exist in the game
function startNewRound(newUserName, repeatMarker) {
  console.clear();
  
  let userInput = '';
  const filterFunction = gamer => newUserName === gamer['name'];

  if (repeatMarker > 0) {
    gamers.filter(filterFunction).length === 0
    ? (console.log(`${LINK_PICTURES.thinking}\n`),
      userInput = readlineSync.question(LINK_SPEAKING.gameForNewUserRepeat))
    : (console.log(`${LINK_PICTURES.thinking}\n`),
      userInput = readlineSync.question(LINK_SPEAKING.gameForOldUserRepeat));

    return userInput;
  }


  gamers.filter(filterFunction).length === 0
    ? (console.log(`${LINK_PICTURES.smile}\n`),
      userInput = readlineSync.question(LINK_SPEAKING.gameForNewUser))
    : (console.log(`${LINK_PICTURES.smile}\n`),
      userInput = readlineSync.question(LINK_SPEAKING.gameForOldUser));

  return userInput;
  //could be "start" or "go"
}
//#endregion ==============

//#region FUNCTION gameStart() that start game from beginning

const gameStart = () => gameSteps();

//#endregion ==============

//#region FUNCTION gameSteps() go throw all steps of a game
function gameSteps(name) {
  console.log(greetingGame());

  // user name input
  let currentUserName = readlineSync.question(LINK_SPEAKING.nameInputStart);

  //name validation
  while (!nameIsValid(currentUserName)) {
    currentUserName = nameChanger();
  };

  // start new round user input
  let currentUserGameStartInput = startNewRound(currentUserName);
  switch (currentUserGameStartInput) {
    case "start":
      console.log('1');
      break;
    case "go":
      console.log('2');
      break;
    default:
      startNewRound(currentUserName, 1)
      break;
  }

  
  
}
//#endregion ==============

gameStart()

// startNewRound('tom1')






