

//#region IMPORTED DATA 

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

class gamer {
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

gamers.push(new gamer('BOT'));

// gamers[gamers.length - 1].updateDateOfGame('dkjjds')



console.clear();

 
//#endregion ==============

//#region FUNCTIONS 

//#region FUNCTION greetingGame() that say hello and get a name of user

function greetingGame() {
  console.clear();
  const welcomeMessage = 
    `${LINK_PICTURES.smile}\n\n${LINK_PICTURES.welcome}\n\n${LINK_SPEAKING.greeting}\n`;

  return welcomeMessage;
}

//#endregion ==============

//#region FUNCTION nameIsValid() that check names

const nameIsValid = name => {
  console.log(`${LINK_PICTURES.welcome}\n`);

  const pattern = /^[a-zA-Z0-9\-._]+$/; //can use a-z, A-Z, 0-9,"_", "-", "."

  return name.split('').every(character => pattern.test(character));
}

//#endregion ==============

//#region FUNCTION nameChanger() that validate names

function nameChanger() {
  console.clear();
  console.log(`${LINK_PICTURES.welcome}\n`);
  const repeatName = readlineSync.question(`${LINK_SPEAKING.nameInputMistake}`);
  return repeatName;
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
  //can be "start" or "go"
}

//#endregion ==============

//#region FUNCTION gameStart() that start game from beginning

const gameStart = () => gameSteps();

//#endregion ==============

//#region FUNCTION addNewGamer() that create new item in the gamers list

function addNewGamer(name) {
  gamers.push(new gamer(name));
  const newGamer = gamers[gamers.length - 1];

  newGamer.id = gamers[gamers.length - 2].id + 1

  for (const title of movies) {
    newGamer.addNewGame(title, 'movies', 'new', '');
  }

  for (const title of books) {
    newGamer.addNewGame(title, 'books', 'new', '');
  }
}

//#endregion ==============




//#region FUNCTION gameSteps() go through all steps of a game

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
      addNewGamer(currentUserName);
      console.log(gamers);
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


//#endregion ==============

gameStart()
// console.log(gamers[gamers.length - 1]);







