
//--EXTERNAL SERVICES IMPORT
import readlineSync from 'readline-sync';
import fs from 'fs/promises';


//--SCRIPTS IMPORT
import { gameRound } from './game-round.js';
import { changeGamersList } from './base-working.js';


//--CONTENT IMPORT
const SPEAKING_BASE = JSON.parse(await fs.readFile('./content/speaking-base.json', 'utf8'));
const TITLES_BASE = JSON.parse(await fs.readFile('./content/titles-base.json', 'utf8'));
const PICTURES_BASE = JSON.parse(await fs.readFile('./content/pictures-base.json', 'utf8'));
const GAMERS_LIST_BASE = JSON.parse(await fs.readFile('./content/gamers-base.json', 'utf8'));




//===FUNCTION gameScreen() that build the screen with pictures and messages depending on markers(string)
function gameScreen(pictures, messages) {
  console.clear();

  const imageConverter = pictureCode => {
    let pictureOutput = '';
    switch (pictureCode) {
      case 'welcome':
        pictureOutput = `${PICTURES_BASE.smile}\n${PICTURES_BASE.welcome}\n`;
      break;
      case 'thinking':
        pictureOutput = `${PICTURES_BASE.thinking}\n`;
        break;
      case 'smile':
        pictureOutput = `${PICTURES_BASE.smile}\n`;
        break;
      case '.':
        pictureOutput = '.\n.\n';
        break;
      case '':
        pictureOutput = '\n\n';
        break;
    }
    return pictureOutput;
  }

 
  const messageConverter = message => {
    let output = '';
    switch (message) {
      case 'greeting':
        output = `${SPEAKING_BASE.greeting}`;
        break;
      case 'user-name':
        output = `${SPEAKING_BASE.nameStart}`;
        break;
      case 'user-name-repeat':
        output = `${SPEAKING_BASE.nameStartRepeat}`;
        break;
      case 'game-category-list':
        output = `${SPEAKING_BASE.gameCategoryList}`;
        break;
      case 'game-category-choice':
        output = `${SPEAKING_BASE.choiceCategory}`;
        break;
      case 'game-category-repeat':
        output = `${SPEAKING_BASE.gameCategoryRepeat}`;
        break;
      case 'new-user':
        output = `${SPEAKING_BASE.gameForNewUser}`;
        break;
      case 'old-user':
        output = `${SPEAKING_BASE.gameForOldUser}`;
        break;
      case 'new-user-repeat':
        output = `${SPEAKING_BASE.gameForNewUserRepeat}`;
        break;
      case 'old-user-repeat':
        output = `${SPEAKING_BASE.gameForOldUserRepeat}`;
        break;
      default:
        output = message;
        break;
    }
    return output;
  }

  let picturePart = '';
  for (let picture of pictures) {
    picturePart += `${imageConverter(picture)}\n`;
  }

  let textPart = '';
  for (let message of messages) {
    textPart += `${messageConverter(message)}\n`;
  }

  console.log(`${picturePart}\n${textPart}`);
};

//===FUNCTION nameIsValid() that check names and returns true or false
function nameIsValid(name) {
  const pattern = /^[a-zA-Z0-9\-._]+$/; //can use a-z, A-Z, 0-9,"_", "-", "."
  return name === ''
    ? false
    : name.split('').every(character => pattern.test(character) && character !== '');
};


//===FUNCTION userAnswer() returns user input
function userAnswer(message) {
  return readlineSync.question(message);
};

//===FUNCTION isUserNameExist() that check is user already exist in the game and returns true or false
function isUserNameExist (userName) {
  return GAMERS_LIST_BASE.gamers.some(gamer => gamer["name"] === userName);
};

//===FUNCTION getCommandToStart() that get a name and speak depending on is the user inside the base or no. Returns validated user input "st" or "go"
function getCommandToStart(newUserName) {
  let userInput = '';
  let repeatMarker = 0;

  !isUserNameExist(newUserName)
    ? (gameScreen(['smile'], ['new-user']),
      userInput = userAnswer(SPEAKING_BASE.userInput))
    : (gameScreen(['smile'], ['old-user']),
      userInput = userAnswer(SPEAKING_BASE.userInput));

  if (userInput === 'st' || userInput === 'go') {
    return userInput;
  } else {
    repeatMarker = 1;
  }

  do {
    !isUserNameExist(newUserName)
    ? (gameScreen(['smile'], ['new-user-repeat']),
      userInput = userAnswer(SPEAKING_BASE.userInput))
    : (gameScreen(['smile'], ['old-user-repeat']),
      userInput = userAnswer(SPEAKING_BASE.userInput));
  } while (userInput === 'st' || userInput === 'go')

  return userInput;
}



//===FUNCTION getUserName() that get and return user name
function getUserName() {
  console.clear();
  let userName = '';
  let repeatMarker = 0;

  gameScreen(['welcome'], ['greeting', 'user-name']);
  userName = userAnswer(SPEAKING_BASE.userInput);

  if (nameIsValid(userName)) {
    return userName;
  } else {
    repeatMarker = 1;
  }
 
  do {
    console.clear();
    gameScreen(["smile"], ['user-name-repeat']);
    userName = userAnswer(SPEAKING_BASE.userInput);
  } while (!nameIsValid(userName))

  return userName;
}

//===FUNCTION getCategory() that get and return user input to start new round
function getCategory(titlesStorage) {

  const categoriesList = Object.keys(titlesStorage);
  //let listToPrint = '';

  const capitaliser = word => {
    const capitalFirstLetter = word[0].toUpperCase();
    const restLetters = word.split("").slice(1).join('').toLowerCase();
    return `${capitalFirstLetter}${restLetters}`;
  }

  const listToPrint = list => {
    let numericalList = '';
    for (let i = 0; i < list.length; i++) {
      if (i === 0) {
        numericalList += `${i + 1}. ${capitaliser(list[i])}`;
      } else if (i === list.length - 1) {
        numericalList += `\n${i + 1}. ${capitaliser(list[i])}\n`;
      } else {
        numericalList += `\n${i + 1}. ${capitaliser(list[i])}`;
      };
    }
    return numericalList;
  }

  const getCategoryIndex = storagePath => {
    let userInput = '';
    let repeatMarker = 0; 

    do {
      if (repeatMarker === 0) {
        console.clear();
        gameScreen(['smile'], ['game-category-list', listToPrint(categoriesList), 'game-category-choice']);
        userInput = userAnswer(SPEAKING_BASE.userInput);
  
        if (/[0-9]/g.test(userInput) && 
            Number(userInput) > 0 && 
            Number(userInput) <= categoriesList.length) {
          return userInput;
        } else {
          repeatMarker = 1;
        }
   
      }
  
      console.clear();
      gameScreen(["thinking"], ['game-category-repeat', listToPrint(categoriesList)]);
      userInput = userAnswer(SPEAKING_BASE.userInput);
    } while (Number(userInput) <= 0 || Number(userInput) > categoriesList.length)

    return userInput;
  }

  const choicenIndex = getCategoryIndex(titlesStorage);

    return categoriesList[choicenIndex - 1];
}

//===FUNCTION startNewRound() !!!
function startNewRound(userName) {


  //get command for start depending on user new or old
  //if new one - "st"
  //if old one - "go"
  const startInput = getCommandToStart(userName);
  const titleBase = TITLES_BASE;
  const gameCategory = getCategory(titleBase);
  const gameTitle = getGameTitle(userName, gameCategory, titleBase);
  let actionInGamerBase = []

  switch (startInput) {
    case "st":
      actionInGamerBase = ["gamer-add", "gamer-game-add"];
      changeGamersList(userName, actionInGamerBase, gameTitle, gameCategory);

      actionInGamerBase = [`gamer-game-status-${gameRound(gameTitle)}`];
      changeGamersList(userName, actionInGamerBase, gameTitle, gameCategory);
      // gameRound(gameTitle);
      // console.log("..........");
      break;
    case "go":
      actionInGamerBase = ["gamer-game-add"];
      changeGamersList(userName, actionInGamerBase, gameTitle, gameCategory);

      actionInGamerBase = [`gamer-game-status-${gameRound(gameTitle)}`];
      changeGamersList(userName, actionInGamerBase, gameTitle, gameCategory);
      // gameRound(gameTitle);
      console.log("..........");
      break;
  }
} 

//===FUNCTION getGameTitle()<< that return a title(string) for new game and put it to user list as object with full data about game. Gamer must exist in the file gamers
function getGameTitle(userName, category, baseOfTitle) {
  console.clear();
  let titleForGame = '';
  const fullGameList = baseOfTitle[category];

  const randomIndex = () => Math.floor(Math.random() * fullGameList.length);

  if (isUserNameExist(userName)) {
    const userGameList = GAMERS_LIST_BASE.gamers.filter((user) => user.name === userName)[0].games;

    do {
      titleForGame = fullGameList[randomIndex(fullGameList)];
    } while (userGameList.includes(titleForGame));
  } 
    titleForGame = fullGameList[randomIndex(fullGameList)];

  return titleForGame;
}

// console.clear()
// console.log(GAMERS_LIST_BASE);
// console.log(gameScreen('welcome'));

export { 
  SPEAKING_BASE,
  TITLES_BASE,
  PICTURES_BASE,
  GAMERS_LIST_BASE,
  fs,
  readlineSync,
  gameScreen,
  startNewRound,
  getGameTitle,
  getCategory,
  getUserName,
  getCommandToStart,
  isUserNameExist,
  userAnswer,
  nameIsValid
}

export {changeGamersList} from './base-working.js';