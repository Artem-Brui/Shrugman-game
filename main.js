

//#region IMPORTED DATA 

const LINK_SPEAKING = require('./content/speaking.json');
const LINK_TITLES = require('./content/titles.json');
const LINK_PICTURES = require('./content/pictures.json');
const LINK_GAMERS_LIST = require('./content/gamers.json');


var readlineSync = require('readline-sync');
var FS = require('fs');
const Gamer = require('./scripts/class-gamer.js');



//#endregion ==============


//#region VARIABLES 

const movies = [...LINK_TITLES.movies];
const books = [...LINK_TITLES.books];
const pathGamersFile = './content/gamers.json';
// const gamers = [{ id: 1, name: 'InitialUser-BOT', games: [] }];

//#endregion ==============


//#region FUNCTIONS 

//#region ====== THE GAME STEPS

//#region FUNCTION roadMap() go through all steps of a game

function roadMap() {
  console.log(greetingGame());

  // user name input
  let currentUserName = userAnswer(LINK_SPEAKING.nameInputStart);

  //name validation
   while (!nameIsValid(currentUserName)) {
    currentUserName = nameChanger();
  };

  // start new round
  const commandToStart = getCommandToStart(currentUserName);
  startNewRound(currentUserName, commandToStart, pathGamersFile);

}
//#endregion ==============



//#endregion ==============


//#region ===== PREPARING BEFORE THE GAME


//#region FUNCTION gameStart() that start game from beginning

const gameStart = () => roadMap();

//#endregion ==============

//#region FUNCTION userAnswer() return user input'

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
  return name === ''
    ? false
    : name.split('').every(character => pattern.test(character) && character !== '');
}

//#endregion ==============

//#region FUNCTION nameChanger() that validate names

function nameChanger() {
  console.clear();
  console.log(`${LINK_PICTURES.welcome}\n`);
  const repeatName = userAnswer(`${LINK_SPEAKING.nameInputMistake}`);
  return repeatName;
}

//#endregion ==============

//#region FUNCTION isUserNameExist() that check is user already exist in the game and return true or false

const isUserNameExist = userName => pathGamersFile.gamers.some(gamer => gamer["name"] === userName);

//#endregion ==============

//#region FUNCTION getCommandToStart() that get and return user input to start new round

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
    //can be "st" or "go"
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

    switch (action) {
      case 'add-new-gamer':
        const newUser = new Gamer(newUserName);
        newUser.id = currentJson.gamers[currentJson.gamers.length - 1].id + 1;
        currentJson.gamers.push(newUser);
        break;
      case 'delete-gamer':
        for (const user of currentJson.gamers) {
          if (user.name === newUserName) {
            currentJson.gamers.splice(currentJson.gamers.indexOf(user), 1);
          }
        }
        break;
      case 'add-new-game-to-user':
        pathToGamers.addNewGame(title, categoryName, gameStatus, lastGameDate)
      default:
        break;
    }

    const jsonString = JSON.stringify(currentJson, null, 2);
    FS.writeFile(pathToGamers, jsonString, (err) => {
        if (err) {
            console.error('Can\'t write file', err);
        }
      });
  });
}

// const obj = {...LINK_GAMERS_LIST.gamers[1]};
// obj.addNewGame('title', 'categoryName', 'gameStatus', 'lastGameDate')

// console.clear();
// console.log(obj);
// changeGamersList(LINK_GAMERS_LIST, 'ar', 'add-new-game-to-user')

//#endregion ==============

//#region FUNCTION addGameToUser() 

// function addGameToUser(name) {
//     obj.addNewGame(title, 'movies', 'new', '');
// }

//#endregion ==============

//#region FUNCTION startNewRound() !!!

function startNewRound(userName, startInput, pathToGamers) {
  switch (startInput) {
    case "st":
      changeGamersList(pathToGamers, userName, 'add-new-gamer');
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

//#endregion ==============

// {
//   "gamers": [
//     { "id": 1, "name": "InitialUser-BOT", "games": [] }]
// }

//#endregion ==============


//#region ====== THE GAME

//#region FUNCTION getGameTitle() that return a title(string) for new game and put it to user list as object with full data about game. Gamer must exist in the file gamers

function getGameTitle(userName, category) {
  console.clear();
  let titleForGame;
  const userGameList = LINK_GAMERS_LIST.gamers.filter((user) => user.name === userName)[0].games;
  const fullGameList = LINK_TITLES[category];

  do {
    const randomIndex = Math.floor(Math.random() * fullGameList.length)
    titleForGame = fullGameList[randomIndex];
  } while (userGameList.includes(titleForGame))

  return titleForGame
}

//#endregion

//#region FUNCTION game(title)

function game(title) {
  console.clear()
  let isGameWinner = false;
  const shragman = '¯\\_(:/)_/¯';

  const titleHider = title => {
    const pattern = /^[a-zA-Z]/
    let hidenLetter = '';
    for (character of title) {
      pattern.test(character) 
        ? hidenLetter += '_'
        : hidenLetter += character;
      }
    return hidenLetter
  }

  const titleRevealer = (title, hidenTittle, letter) => {
    let updatedTitle = '';
    let letterIsFound = false;

    for (let i = 0; i < title.length; i++) {
      title[i].toLowerCase() === letter.toLowerCase()
        ? (updatedTitle += title[i], letterIsFound = true)
        : updatedTitle += hidenTittle[i];
    }

    if (!letterIsFound && gameShragman.length !== shragman.length) {
      gameShragman += shragman[gameShragman.length];
    }

    return updatedTitle;
  }

  let gameShragman = ''
  let gameTitle = titleHider(title);
  
  do {
    console.clear()
    console.log(`\n${gameTitle}\n`);
    console.log(`\n${gameShragman}\n`);
    let letterForChecking = '';
    let needToRepeat = false;
    do {
      console.clear()
      console.log(`\n${gameTitle}\n`);
      console.log(`\n${gameShragman}\n`);

      needToRepeat
        ? letterForChecking = userAnswer(`${LINK_SPEAKING.repeatChoiceWithLetter}`)
        : letterForChecking = userAnswer(`${LINK_SPEAKING.makeChoiceWithLetter}`);
      
      needToRepeat = true;
    } while (letterForChecking.length !== 1)
    //

    gameTitle = titleRevealer(title, gameTitle, letterForChecking);
  } while (gameTitle.includes('_'));

  console.clear()
  console.log(`\n${gameTitle}\n`);
  console.log(`${LINK_SPEAKING.winner}`);
  isGameWinner = true;

    return titleHider(title)
}

//#endregion



//#endregion


//#endregion ======FUNCTIONS======

console.log(getGameTitle('ar', 'movies'));
console.log(game('Forrest Gump 2'))
//gameStart()







