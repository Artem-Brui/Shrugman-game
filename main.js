

//#region IMPORTED DATA 

//EXTERNAL SERVICES
var readlineSync = require('readline-sync');

//CONTENT
const LINK_SPEAKING = require('./content/speaking-base.json');
const LINK_TITLES = require('./content/titles-base.json');
const LINK_PICTURES = require('./content/pictures-base.json');
const LINK_GAMERS_LIST = require('./content/gamers-base.json');

//SCRIPTS-IMPORT
const { 
  gameRound,
  getGameTitle
 } = require('./scripts/game.js');

const { 
  changeGamersList
 } = require('./scripts/bases-workspace.js');


//CLASSES-IMPORT
const {
  Gamer,
  NewGame
} = require('./scripts/classes.js');


//VARIABLES 
const movies = [...LINK_TITLES.movies];
const books = [...LINK_TITLES.books];
const pathGamersFile = './content/gamers-base.json';


//===FUNCTION gameScreen() that write screen pictures depending on marker(string)
const gameScreen = marker => {
  switch (marker) {
    case 'welcome':
      console.clear();
      console.log(`${LINK_PICTURES.smile}\n`);
      console.log(`${LINK_PICTURES.welcome}\n`);
      break;
    case 'thinking':
      console.clear();
      console.log(`${LINK_PICTURES.thinking}\n`);
      break;
    case 'smile':
      console.clear();
      console.log(`${LINK_PICTURES.smile}\n`);
      break;
  }
}

//===FUNCTION nameIsValid() that check names and return true or false
const nameIsValid = name => {
  console.log(`${LINK_PICTURES.welcome}\n`);

  const pattern = /^[a-zA-Z0-9\-._]+$/; //can use a-z, A-Z, 0-9,"_", "-", "."
  return name === ''
    ? false
    : name.split('').every(character => pattern.test(character) && character !== '');
}

//===FUNCTION userAnswer() return user input'
const userAnswer = message => readlineSync.question(message);


//===FUNCTION isUserNameExist() that check is user already exist in the game and return true or false
const isUserNameExist = userName => LINK_GAMERS_LIST.gamers.some(gamer => gamer["name"] === userName);


//===FUNCTION getCommandToStart() that get and return user input to start new round
function getCommandToStart(newUserName, repeatMarker) {
  let userInput = '';
  console.log(LINK_GAMERS_LIST.gamers);

  if (repeatMarker > 0) {
    !isUserNameExist(newUserName)
    ? (gameScreen('thinking'),
      userInput = userAnswer(LINK_SPEAKING.gameForNewUserRepeat))
    : (gameScreen('thinking'),
      userInput = userAnswer(LINK_SPEAKING.gameForOldUserRepeat));

    return userInput;
  } 

  !isUserNameExist(newUserName)
  ? (gameScreen('smile'),
    userInput = userAnswer(LINK_SPEAKING.gameForNewUser))
  : (gameScreen('smile'),
    userInput = userAnswer(LINK_SPEAKING.gameForOldUser));

  return userInput;
    //can be "st" or "go"
}

//===FUNCTION startNewRound() !!!
function startNewRound(userName, startInput, pathToGamers) {
  switch (startInput) {
    case "st":
      changeGamersList(pathGamersFile, userName, 'add-new-gamer');
      //getGameTitle(userName, 'movies');
      break;
    case "go":
      console.log('2');
      break;
    default:
      getCommandToStart(userName, 1)
      break;
  }
}



//===============================
//===============================
//===============================
//===============================

function gameStart() {
  console.clear();

  //greeting screen
  gameScreen('welcome');
  console.log(LINK_SPEAKING.greeting);

  // user name input
  let currentUserName = userAnswer(LINK_SPEAKING.nameInputStart);

  //name validation
   while (!nameIsValid(currentUserName)) {
    gameScreen('welcome');
    currentUserName = userAnswer(`${LINK_SPEAKING.nameInputMistake}`);
  };

  // start new round
  const commandToStart = getCommandToStart(currentUserName);
  startNewRound(currentUserName, commandToStart, pathGamersFile);

}



// {
//   "gamers": [
//     { "id": 1, "name": "InitialUser-BOT", "games": [] }]
// }

console.clear()
//console.log(getGameTitle('ar', 'movies'));
console.log(isUserNameExist('ar'))
// console.log(`${LINK_PICTURES.sad}\n`);
//gameStart()

changeGamersList(pathGamersFile, "ar", 'add-new-game-to-user');




module.exports = { 
  userAnswer,
  getCommandToStart,
  pathGamersFile,
  readlineSync,
  startNewRound,
  nameIsValid,
  gameScreen
};
