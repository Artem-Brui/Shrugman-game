
//--EXTERNAL SERVICES IMPORT
var fs = require('fs');

//--SCRIPTS IMPORT
const {
  Gamer,
  NewGame
} = require('./classes.js');


//===FUNCTION isUserExist() that check is user already exist in the game and returns true or false
const isUserExist = (userName, base) => base.some(gamer => gamer["name"] === userName);

//===FUNCTION isUserHasGame() that check is user has a game and returns true or false
const isUserHasGame = (user, titleOfGame) => user.games.some((game) => titleOfGame === game.title);

//===FUNCTION getTodayDate() // format: 01.7.2024
function getTodayDate() {
  const fullCurrentDate = new Date();
  const day = fullCurrentDate.getDate();
  const month = fullCurrentDate.getMonth() + 1;
  const year = fullCurrentDate.getFullYear();

  return `${day}.${month}.${year}`;
};

//=======FUNCTION changeGamersList() that create new item in the gamers list. Nothing to return, just aside affect with file gamers-base.
// Actions:
//  gamer-add
//  gamer-delete
//  gamer-game-add
//  gamer-game-clean
//  gamer-game-status-win
//  gamer-game-status-lose
function changeGamersList(UserName, actions, gameTitle, gameCategory) {
  const pathToGamers = './content/gamers-base.json';
  const rawData = fs.readFileSync(pathToGamers, 'utf8');
  const parsedData = JSON.parse(rawData);
  const gamersList = parsedData.gamers;
  
  for (let action of actions) {
    switch (action) {
      case 'gamer-add':
        if (!isUserExist(UserName, gamersList)) {
          const newUser = {...new Gamer(UserName)};
          newUser.id = gamersList.length 
            ? gamersList[gamersList.length - 1].id + 1
            : 1;
          gamersList.push(newUser);
        }
        break;

      case 'gamer-delete':
        if (isUserExist(UserName)) {
          gamersList.forEach(gamer => {
            if (gamer.name === UserName) {
              const gamerIndex = gamersList.indexOf(gamer);
              gamersList.splice(gamerIndex, 1);
            }
          })
        }
        break;

      case 'gamer-game-add':
        if (isUserExist(UserName, gamersList)) {
          const newUserGame = {...new NewGame(gameTitle, gameCategory, 'not-finished', getTodayDate())};

          gamersList.forEach(gamer => {
            if (gamer.name === UserName && !isUserHasGame(gamer, gameTitle)) {
              gamer.games.push(newUserGame);
            }
          })
        }
        break;

      case 'gamer-game-clean':
        if (isUserExist(UserName, gamersList)) {
          gamersList.forEach(gamer => {
            if (gamer.name === UserName) {
              gamer.games = [];
            }
          })
        }
        break;

      case 'gamer-game-status-win':
        if (isUserExist(UserName, gamersList)) {
          gamersList.forEach(gamer => {
            if (gamer.name === UserName && isUserHasGame(gamer, gameTitle)) {
              gamer.games.forEach((game) => {
                if (game.title === gameTitle) {
                  game.gameStatus = 'win';
                }
              })
            }
          })
        }
        break;

      case 'gamer-game-status-lose':
        if (isUserExist(UserName, gamersList)) {
          gamersList.forEach(gamer => {
            if (gamer.name === UserName && isUserHasGame(gamer, gameTitle)) {
              gamer.games.forEach((game) => {
                if (game.title === gameTitle) {
                  game.gameStatus = 'lose';
                }
              })
            }
          })
        }
        break;

      default:
        break;
    }
  }

  fs.writeFileSync(pathToGamers, JSON.stringify(parsedData, null, 2))
}

module.exports = { 
  changeGamersList
};