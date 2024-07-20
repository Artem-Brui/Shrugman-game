
//--EXTERNAL SERVICES IMPORT
var readlineSync = require('readline-sync');


//--CONTENT IMPORT
const LINK_SPEAKING = require('../content/speaking-base.json');
const LINK_TITLES = require('../content/titles-base.json');
const LINK_PICTURES = require('../content/pictures-base.json');
const LINK_GAMERS_LIST = require('../content/gamers-base.json');


//--SCRIPTS IMPORT
const {
  changeGamersList
} = require('./base-working.js');


//===FUNCTION gameScreen() that build the screen with pictures and messages depending on markers(string)
function gameScreen(imageCode, ...messages) {
  console.clear();
  const messageConverter = message => {
    let output = '';
    switch (message) {
      case 'greeting':
        output = `${LINK_SPEAKING.greeting}`;
        break;
      case 'user-name':
        output = `${LINK_SPEAKING.nameStart}`;
        break;
      case 'user-name-repeat':
        output = `${LINK_SPEAKING.nameStartRepeat}`;
        break;
      case 'game-category-list':
        output = `${LINK_SPEAKING.gameCategoryList}`;
        break;
      case 'game-category-choice':
        output = `${LINK_SPEAKING.choiceCategory}`;
        break;
      case 'game-category-repeat':
        output = `${LINK_SPEAKING.gameCategoryRepeat}`;
        break;
      case 'new-user':
        output = `${LINK_SPEAKING.gameForNewUser}`;
        break;
      case 'old-user':
        output = `${LINK_SPEAKING.gameForOldUser}`;
        break;
      case 'new-user-repeat':
        output = `${LINK_SPEAKING.gameForNewUserRepeat}`;
        break;
      case 'old-user-repeat':
        output = `${LINK_SPEAKING.gameForOldUserRepeat}`;
        break;
      default:
        output = message;
        break;
    }
    return output;
  }

  const imageConverter = pictureCode => {
    let pictureOutput = '';
    switch (pictureCode) {
      case 'welcome':
        pictureOutput = `${LINK_PICTURES.smile}\n${LINK_PICTURES.welcome}\n`;
      break;
      case 'thinking':
        pictureOutput = `${LINK_PICTURES.thinking}\n`;
        break;
      case 'smile':
        pictureOutput = `${LINK_PICTURES.smile}\n`;
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

  const convertedMessages = messages.map(messageConverter);
  const picture = imageConverter(imageCode);

  console.log(`${picture}\n${convertedMessages.join('\n')}`);
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
function isUserNameExist (userName, documentPath) {
  const path = documentPath ? documentPath : LINK_GAMERS_LIST.gamers;
  return path.some(gamer => gamer["name"] === userName);
}

//===FUNCTION getCommandToStart() that get a name and speak depending on is the user inside the base or no. Returns validated user input "st" or "go"
function getCommandToStart(newUserName) {
  let userInput = '';
  let repeatMarker = 0;

  !isUserNameExist(newUserName)
    ? (gameScreen('smile', 'new-user'),
      userInput = userAnswer(LINK_SPEAKING.userInput))
    : (gameScreen('smile', 'old-user'),
      userInput = userAnswer(LINK_SPEAKING.userInput));

  if (userInput === 'st' || userInput === 'go') {
    return userInput;
  } else {
    repeatMarker = 1;
  }

  do {
    !isUserNameExist(newUserName)
    ? (gameScreen('smile', 'new-user-repeat'),
      userInput = userAnswer(LINK_SPEAKING.userInput))
    : (gameScreen('smile', 'old-user-repeat'),
      userInput = userAnswer(LINK_SPEAKING.userInput));
  } while (userInput === 'st' || userInput === 'go')

  return userInput;
}

//===FUNCTION getUserName() that get and return user name
function getUserName() {
  console.clear();
  let userName = '';
  let repeatMarker = 0;

  gameScreen('welcome', 'greeting', 'user-name');
  userName = userAnswer(LINK_SPEAKING.userInput);

  if (nameIsValid(userName)) {
    return userName;
  } else {
    repeatMarker = 1;
  }
 
  do {
    console.clear();
    gameScreen("smile", 'user-name-repeat');
    userName = userAnswer(LINK_SPEAKING.userInput);
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
        gameScreen('smile', 'game-category-list', listToPrint(categoriesList), 'game-category-choice');
        userInput = userAnswer(LINK_SPEAKING.userInput);
  
        if (/[0-9]/g.test(userInput) && 
            Number(userInput) > 0 && 
            Number(userInput) <= categoriesList.length) {
          return userInput;
        } else {
          repeatMarker = 1;
        }
   
      }
  
      console.clear();
      gameScreen("thinking", 'game-category-repeat', listToPrint(categoriesList));
      userInput = userAnswer(LINK_SPEAKING.userInput);
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
  let actionInGamerBase = []

  switch (startInput) {
    case "st":
      const gameCategory = getCategory(LINK_TITLES);
      const gameTitle = getGameTitle(userName, gameCategory);
      console.log(gameTitle);
      console.log(gameCategory);
      actionInGamerBase = ["gamer-add", "gamer-game-add"];
      changeGamersList(userName, actionInGamerBase, gameTitle, gameCategory);
      gameRound(gameTitle);
      break;
    case "go":
      actionInGamerBase = ["gamer-game-add"];
      changeGamersList(userName, actionInGamerBase, gameTitle, gameCategory);
      gameRound(gameTitle);
      console.log('2');
      break;
  }
} 



//===FUNCTION getGameTitle()<< that return a title(string) for new game and put it to user list as object with full data about game. Gamer must exist in the file gamers
function getGameTitle(userName, category) {
  console.clear();
  let titleForGame = '';
  const fullGameList = LINK_TITLES[category];

  const randomIndex = (list) => Math.floor(Math.random() * fullGameList.length);

  if (isUserNameExist(userName)) {
    const userGameList = LINK_GAMERS_LIST.gamers.filter((user) => user.name === userName)[0].games;

    do {
      titleForGame = fullGameList[randomIndex(fullGameList)];
    } while (userGameList.includes(titleForGame));
  } 
    titleForGame = fullGameList[randomIndex(fullGameList)];

  return titleForGame;
}


//GAME-LOGIK
//===FUNCTION game()<< that return a status(string) of game result "not-finished", "win" or "lose"
function gameRound(title) {
  console.clear();
  let gameStatus = "";
  const shragman = '¯\\_(:/)_/¯';
  
  //convert title character to '_'
  const titleHider = title => {
    const pattern = /^[a-zA-Z]/;
    let hidenLetter = '';

    for (character of title) {
      pattern.test(character) 
        ? hidenLetter += '_'
        : hidenLetter += character;
      }

    return hidenLetter;
  }

  //make visible character if user guess a letter
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

  let gameShragman = '';
  let gameTitle = titleHider(title);

  //game part working until shragmin will be full OR user will guess all letters
  do {
    console.clear();
    console.log(`\n${gameTitle}\n`);
    console.log(`\n${gameShragman}\n`);

    let letterForChecking = '';
    let needToRepeat = false;

    do {
      console.clear();
      gameScreen('thinking', `\n${gameTitle}\n`, `\n${gameShragman}\n`)

      needToRepeat
        ? letterForChecking = userAnswer(`${LINK_SPEAKING.userLetterInputRepeat}`)
        : letterForChecking = userAnswer(`${LINK_SPEAKING.userLetterInput}`);
      
      needToRepeat = true;
    } while (letterForChecking.length !== 1) //some validator of user input (ONLY ONE letter accept)
    
    gameTitle = titleRevealer(title, gameTitle, letterForChecking);

    if (gameShragman.length === shragman.length) {
      gameStatus = 'lose';
    }

    if (!gameTitle.includes('_')) {
      gameStatus = 'win';
    }

  } while (gameTitle.includes('_') && gameShragman.length !== shragman.length);

  console.clear();

  //Outoput message depending a result of game
  switch (gameStatus) {
    case 'lose':
      gameScreen('sad', `\n${gameTitle}\n`, `\n${LINK_SPEAKING.loser}\n`)
      break;
    case 'win':
      gameScreen('sad', `\n${gameTitle}\n`, `\n${LINK_SPEAKING.winnner}\n`)
      break;
  }

    return gameStatus;
}


module.exports = { 
  gameRound,
  getGameTitle,
  startNewRound,
  getCategory,
  getUserName,
  getCommandToStart,
  isUserNameExist,
  userAnswer,
  nameIsValid,
  gameScreen
};