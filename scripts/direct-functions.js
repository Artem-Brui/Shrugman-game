
//--EXTERNAL SERVICES IMPORT
import readlineSync from 'readline-sync';
import fs from 'fs-extra';
import chalk from 'chalk';


//--SCRIPTS IMPORT
import { gameRound } from './game-round.js';
import { letStart } from '../main.js';
import { changeGamersList } from './base-working.js';


//--CONTENT IMPORT
const SPEAKING_BASE = fs.readJsonSync('./content/speaking-base.json', 'utf8');
const TITLES_BASE = fs.readJsonSync('./content/titles-base.json', 'utf8');
const PICTURES_BASE = fs.readJsonSync('./content/pictures-base.json', 'utf8');
const GAMERS_LIST_BASE = fs.readJsonSync('./content/gamers-base.json', 'utf8');



//===FUNCTION gameScreen() that build the screen with pictures and messages depending on markers
function gameScreen(pictures, messages) {
  console.clear();

  const imageConverter = pictureCode => {
    let pictureOutput = '';
    switch (pictureCode) {
      case 'welcome':
        pictureOutput = chalk.cyanBright(`${PICTURES_BASE.smile}\n${PICTURES_BASE.welcome}\n`);
      break;
      case 'thinking':
        pictureOutput = chalk.cyanBright(`${PICTURES_BASE.thinking}\n`);
        break;
      case 'sad':
        pictureOutput = chalk.redBright.bgRed(chalk.red(`${PICTURES_BASE.sad}\n`));
        break;
      case 'win':
        pictureOutput = chalk.bgWhite.greenBright(`${PICTURES_BASE.win}\n`);
        break;
      case 'smile':
        pictureOutput = chalk.cyanBright(`${PICTURES_BASE.smile}\n`);
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
        output = chalk.yellowBright(`${SPEAKING_BASE.greeting}`);
        break;
      case 'user-name':
        output = chalk.yellowBright(`${SPEAKING_BASE.nameStart}`);
        break;
      case 'user-name-repeat':
        output = chalk.yellowBright(`${SPEAKING_BASE.nameStartRepeat}`);
        break;
      case 'game-category-list':
        output = chalk.yellowBright(`${SPEAKING_BASE.gameCategoryList}`);
        break;
      case 'game-category-choice':
        output = chalk.yellowBright(`${SPEAKING_BASE.choiceCategory}`);
        break;
      case 'game-category-repeat':
        output = chalk.yellowBright(`${SPEAKING_BASE.gameCategoryRepeat}`);
        break;
      case 'new-user':
        output = chalk.yellowBright(`${SPEAKING_BASE.gameForNewUser}`);
        break;
      case 'old-user':
        output = chalk.yellowBright(`${SPEAKING_BASE.gameForOldUser}`);
        break;
      case 'st':
        output = chalk.yellowBright(`${SPEAKING_BASE.sendSt}`);
        break;
      case 'go':
        output = chalk.yellowBright(`${SPEAKING_BASE.sendGo}`);
        break;
      case 'new-user-repeat':
        output = chalk.yellowBright(`${SPEAKING_BASE.gameForNewUserRepeat}`);
        break;
      case 'old-user-repeat':
        output = chalk.yellowBright(`${SPEAKING_BASE.gameForOldUserRepeat}`);
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

//===FUNCTION animeMaker() that converts list of pictures to animation
function animeMaker(list, lastSlide, interval, colors, background) {
  let index = 0;
  const colored = background ? chalk[background] : chalk;

  return new Promise((resolve) => {
    const showMeSlide = () => {
      console.clear();
      index % 2 === 0
        ? console.log(colored[colors[0]](list[index]))
        : console.log(colored[colors[1]](list[index]));

      index = (index + 1) % list.length;

      if (index === 0) {
        setTimeout(() => {
          console.clear();
          console.log(lastSlide);
          resolve();
        }, interval);
      } else {
        setTimeout(showMeSlide, interval);
      }
    };

    showMeSlide();
  });
};

//===FUNCTION nameIsValid() that check names and returns true or false
function nameIsValid(name) {
  const pattern = /^[a-zA-Z0-9\-._]+$/; //can use a-z, A-Z, 0-9,"_", "-", "."
  return name === ''
    ? false
    : name.split('').every(character => pattern.test(character) && character !== '');
};

//===FUNCTION capitaliser() that capitalise words and returns it
function capitaliser(word) {
  const capitalFirstLetter = word[0].toUpperCase();
  const restLetters = word.split("").slice(1).join('').toLowerCase();
  return `${capitalFirstLetter}${restLetters}`;
};

//===FUNCTION userAnswer() returns user input
function userAnswer(message) {
  return readlineSync.question(message);
};

//===FUNCTION isUserNameExist() that check is user already exist in the game and returns true or false
function isUserNameExist(userName) {
  return GAMERS_LIST_BASE.gamers.some(gamer => gamer["name"] === userName);
};

//===FUNCTION isUserHasGame() that check is user has a game in the base and returns true or false
function isUserHasGame(user, titleOfGame) {
  return user.games.some((game) => titleOfGame === game.title);
};

//===FUNCTION getTodayDate() // format: 01.7.2024
function getTodayDate() {
  const fullCurrentDate = new Date();
  const day = fullCurrentDate.getDate();
  const month = fullCurrentDate.getMonth() + 1;
  const year = fullCurrentDate.getFullYear();

  return `${day}.${month}.${year}`;
};

//===FUNCTION getOldGamesList() create string with user's game history
function getOldGamesList(user) {
  const userGames = GAMERS_LIST_BASE.gamers.filter((gamer) => gamer.name === user)[0].games;

  const categories = []
  const sortedGames = [];

  for (let i = 0; i < userGames.length; i++) {
    let category = userGames[i].categoryName;

    if (!categories.includes(category)) {
      categories.push(category);
      const categoryMessage = [`${capitaliser(category)}:\n`];

      for (let n = 0; n < userGames.length; n++) {
        if (category === userGames[n].categoryName) {
          categoryMessage.push(`${chalk.magentaBright(userGames[n].title)} - ${chalk.cyan(userGames[n].gameStatus)}\n`);
        }
      }

      sortedGames.push(categoryMessage);
    }
  }

  const output = sortedGames.map((item) => {
    for (let i = 1; i < item.length; i++) {
      item[i] = `${chalk.magentaBright(i)}. ${item[i]}`
    }
    let result = item.join('');
    return result;
  })

  output.unshift(chalk.yellowBright('\nHere is your game history:\n'));

  return output.join('\n');
};

//===FUNCTION getCommandToStart() that get a name and speak depending on is the user inside the base or no. Returns validated user input "st" or "go"
function getCommandToStart(newUserName) {
  let userInput = '';
  let repeatMarker = 0;

  !isUserNameExist(newUserName)
    ? (gameScreen(['smile'], ['new-user', 'st']),
      userInput = userAnswer(chalk.greenBright(SPEAKING_BASE.userInput)))
    : (gameScreen(['smile'], ['old-user', 'go']),
      userInput = userAnswer(chalk.greenBright(SPEAKING_BASE.userInput)));

  if (userInput === 'st' || userInput === 'go') {
    return userInput;
  } else {
    repeatMarker = 1;
  }

  do {
    !isUserNameExist(newUserName)
    ? (gameScreen(['smile'], ['new-user-repeat', 'st']),
      userInput = userAnswer(chalk.greenBright(SPEAKING_BASE.userInput)))
    : (gameScreen(['smile'], ['old-user-repeat', 'go']),
      userInput = userAnswer(chalk.greenBright(SPEAKING_BASE.userInput)));
  } while (userInput === 'st' || userInput === 'go')

  return userInput;
};

//===FUNCTION getUserName() that get and return user name
function getUserName() {
  
  console.clear();
  let userName = '';
  let repeatMarker = 0;

  gameScreen(['welcome'], ['greeting', 'user-name']);

  userName = userAnswer(chalk.greenBright(SPEAKING_BASE.userInput));

  if (nameIsValid(userName)) {
    return userName;
  } else {
    repeatMarker = 1;
  }
 
  do {
    console.clear();
    gameScreen(["smile"], ['user-name-repeat']);
    userName = userAnswer(chalk.greenBright(SPEAKING_BASE.userInput));
  } while (!nameIsValid(userName))

  return userName;
};

//===FUNCTION getCategory() that get and return user input to start new round
function getCategory(titlesStorage) {

  const categoriesList = Object.keys(titlesStorage);

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
        userInput = userAnswer(chalk.greenBright(SPEAKING_BASE.userInput));
  
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
      userInput = userAnswer(chalk.greenBright(SPEAKING_BASE.userInput));
    } while (Number(userInput) <= 0 || Number(userInput) > categoriesList.length)

    return userInput;
  }

  const choicenIndex = getCategoryIndex(titlesStorage);

    return categoriesList[choicenIndex - 1];
};

//===FUNCTION gameSteps() !!!
async function gameSteps(userName, repeatIndex) {

  //get command for start depending on user new or old
  //if new one - "st"
  //if old one - "go"
  let isRepeatGame = repeatIndex ? true : false;
  const startInput = isRepeatGame ? 'go' : getCommandToStart(userName);
  const titleBase = TITLES_BASE;
  const gameCategory = getCategory(titleBase);
  const gameTitle = getGameTitle(userName, gameCategory, titleBase);
  let actionInGamerBase = [];
  let resultOfGame;

  switch (startInput) {
    case "st":
      actionInGamerBase = ["gamer-add", "gamer-game-add"];
      changeGamersList(userName, actionInGamerBase, gameTitle, gameCategory);
      break;
    case "go":
      actionInGamerBase = ["gamer-game-add"];
      changeGamersList(userName, actionInGamerBase, gameTitle, gameCategory);
      break;
  }

  resultOfGame = gameRound(gameTitle);
  actionInGamerBase = [`gamer-game-status-${resultOfGame}`];
  changeGamersList(userName, actionInGamerBase, gameTitle, gameCategory);

  const titleMessage = chalk.yellow(`The Title was: \n${chalk.bgGreenBright.white(gameTitle)}`)
  let lastPicture = '';
  let lastMessage = '';
  let newGame = '';

  switch (resultOfGame) {
    case 'lose':
      lastPicture = 'sad';
      lastMessage = chalk.red(SPEAKING_BASE.loser);
      await animeMaker(PICTURES_BASE["sad-anime"], PICTURES_BASE["sad"], 20, ['red', 'bgRed']);
      break;
    case 'win':
      lastPicture = 'win';
      lastMessage = chalk.green(SPEAKING_BASE.winner);
      await animeMaker(PICTURES_BASE["win-anime"], PICTURES_BASE["win"], 40, ['green', 'greenBright'], 'bgWhite');
      break;
  }

  do {
    console.clear();
    gameScreen([lastPicture], [`\n${titleMessage}`, `\n${lastMessage}`, `\n${chalk.magentaBright(getOldGamesList(userName))}\n`]);

    newGame = userAnswer(chalk.green(SPEAKING_BASE.restart));
  } while (newGame !== 'y' && newGame !== 'n')

  if (newGame === 'y') {
    gameSteps(userName, 1);
  } else {
    console.clear();
    return;
  }
};

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
};


//--EXPORT
export { 
  fs,
  SPEAKING_BASE,
  TITLES_BASE,
  PICTURES_BASE,
  GAMERS_LIST_BASE,
  gameScreen,
  animeMaker,
  gameSteps,
  gameRound,
  getGameTitle,
  getCategory,
  getUserName,
  getCommandToStart,
  getTodayDate,
  isUserHasGame,
  isUserNameExist,
  getOldGamesList,
  userAnswer,
  chalk,
  nameIsValid
}