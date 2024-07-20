
//--EXTERNAL SERVICES IMPORT
import {
  fs,
  SPEAKING_BASE,
  TITLES_BASE,
  PICTURES_BASE,
  isUserNameExist
} from './direct-functions.js';


//--SCRIPTS IMPORT
import { Gamer, NewGame } from './classes.js';

const GAMERS_LIST_BASE = JSON.parse(await fs.readFile('./content/gamers-base.json', 'utf8'));


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
  const gamersStorage = GAMERS_LIST_BASE;

  for (let action of actions) {
    switch (action) {
      case 'gamer-add':
        if (!isUserNameExist(UserName)) {
          const newUser = {...new Gamer(UserName)};
          newUser.id = gamersStorage.gamers.length 
            ? gamersStorage.gamers[gamersStorage.gamers.length - 1].id + 1
            : 1;
          gamersStorage.gamers.push(newUser);
        }
        break;

      case 'gamer-delete':
        if (isUserNameExist(UserName)) {
          gamersStorage.gamers.forEach(gamer => {
            if (gamer.name === UserName) {
              const gamerIndex = gamersStorage.gamers.indexOf(gamer);
              gamersStorage.gamers.splice(gamerIndex, 1);
            }
          })
        }
        break;

      case 'gamer-game-add':
        if (isUserNameExist(UserName)) {
          const newUserGame = {...new NewGame(gameTitle, gameCategory, 'not-finished', getTodayDate())};

          gamersStorage.gamers.forEach(gamer => {
            if (gamer.name === UserName && !isUserHasGame(gamer, gameTitle)) {
              gamer.games.push(newUserGame);
            }
          })
        }
        break;

      case 'gamer-game-clean':
        if (isUserNameExist(UserName)) {
          gamersStorage.gamers.forEach(gamer => {
            if (gamer.name === UserName) {
              gamer.games = [];
            }
          })
        }
        break;

      case 'gamer-game-status-win':
        if (isUserNameExist(UserName)) {
          gamersStorage.gamers.forEach(gamer => {
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
        if (isUserNameExist(UserName)) {
          gamersStorage.gamers.forEach(gamer => {
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
    }
  }

  fs.writeFile(pathToGamers, JSON.stringify(gamersStorage, null, 2))
}

export {changeGamersList};

// {
//   "gamers": []
// }