

//#region IMPORTED DATA 

const LINK_SPEAKING = require('./content/speaking.json');
const LINK_TITLES = require('./content/titles.json');
const LINK_PICTURES = require('./content/pictures.json');
const LINK_GAMERS_LIST = require('./content/gamers.json');


var readlineSync = require('readline-sync');
const FS = require('fs');
const Gamer = require('./scripts/class-gamer.js');



//#endregion ==============

//#region VARIABLES 

const movies = [...LINK_TITLES.movies];
const books = [...LINK_TITLES.books];
const pathGamersFile = './content/gamers.json';
// const gamers = [{ id: 1, name: 'InitialUser-BOT', games: [] }];

//#endregion ==============


//#region FUNCTIONS 


//PREPARING BEFORE THE GAME


//#region FUNCTION gameStart() that start game from beginning

const gameStart = () => roadMap();

//#endregion ==============

//#region FUNCTION userInput() return user input'

const userAnswer = message => readlineSync.question(message);

//#endregion ==============

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
  const repeatName = userInput(`${LINK_SPEAKING.nameInputMistake}`);
  return repeatName;
}

//#endregion ==============

//#region FUNCTION isUserNameExist() that check is user already exist in the game and return true or false

const isUserNameExist = (pathToGamers, userName) => pathToGamers.gamers.some(gamer => gamer["name"] === userName);

//#endregion ==============

//#region FUNCTION takeCommandToStart() that get and return user input to start new round

function getCommandToStart(newUserName, repeatMarker) {
  console.clear();
  let userInput = '';

  if (repeatMarker > 0) {
    !isUserNameExist(LINK_GAMERS_LIST, newUserName)
    ? (console.log(`${LINK_PICTURES.thinking}\n`),
      userInput = userAnswer(LINK_SPEAKING.gameForNewUserRepeat))
    : (console.log(`${LINK_PICTURES.thinking}\n`),
      userInput = userAnswer(LINK_SPEAKING.gameForOldUserRepeat));

    return userInput;
  } 

  !isUserNameExist(LINK_GAMERS_LIST, newUserName)
  ? (console.log(`${LINK_PICTURES.smile}\n`),
    userInput = userAnswer(LINK_SPEAKING.gameForNewUser))
  : (console.log(`${LINK_PICTURES.smile}\n`),
    userInput = userAnswer(LINK_SPEAKING.gameForOldUser));

  return userInput;
    //can be "start" or "go"
}

//#endregion ==============

//#region FUNCTION changeGamersList() that create new item in the gamers list. Nothing to return, just aside affect.


function changeGamersList(pathToGamers, newUserName, action) {
  let currentJson = {};
  
  FS.readFile(pathToGamers, 'utf8', (err, data) => {
    if (err) {
      console.error('Can\'t read file:', err);
      return;
    }

    currentJson = JSON.parse(data);

    if (action === 'add') {
      const newUser = new Gamer(newUserName);
      newUser.id = currentJson.gamers[currentJson.gamers.length - 1].id + 1;
      currentJson.gamers.push(newUser);
    }

    if (action === 'delete') {
      for (const user of currentJson.gamers) {
        if (user.name === newUserName) {
          currentJson.gamers.splice(currentJson.gamers.indexOf(user), 1);
        }
      }
    }

    const jsonString = JSON.stringify(currentJson, null, 2);
    FS.writeFile(pathToGamers, jsonString, (err) => {
        if (err) {
            console.error('Can\'t write file', err);
        }
      });
  });
}

//#endregion ==============


// {
//   "gamers": [
//     { "id": 1, "name": "InitialUser-BOT", "games": [] }]
// }



//THE GAME





//#region FUNCTION addGameToUser() 

function addGameToUser(name) {
    obj.addNewGame(title, 'movies', 'new', '');
}

//#endregion ==============

//#region FUNCTION startNewRound() 

function startNewRound(userName, startInput, pathToGamers) {
  switch (startInput) {
    case "start":
      changeGamersList(pathToGamers, userName, 'add');
      break;
    case "go":
      changeGamersList(pathToGamers, userName, 'delete');
      console.log('2');
      break;
    default:
      getCommandToStart(userName, 1)
      break;
  }
}

//#endregion ==============

//#region FUNCTION startNewRound() 



//#endregion ==============


//THE GAME STEPS



//#region FUNCTION roadMap() go through all steps of a game

function roadMap() {
  console.log(greetingGame());

  // user name input
  let currentUserName = userAnswer(LINK_SPEAKING.nameInputStart);

  //name validation
  while (!nameIsValid(currentUserName)) {
    currentUserName = nameChanger();
  };
  // start new round user input
  const commandToStart = getCommandToStart(currentUserName);
  startNewRound(currentUserName, commandToStart, pathGamersFile);


}
//#endregion ==============



//#endregion ==============

gameStart()







