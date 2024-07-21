
//--EXTERNAL SERVICES IMPORT
import {
  fs,
  GAMERS_LIST_BASE,
  isUserHasGame,
  getTodayDate,
  isUserNameExist
} from './direct-functions.js';


//--SCRIPTS IMPORT
import { Gamer, NewGame } from './classes.js';


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
  const updatedStorage = {...GAMERS_LIST_BASE};

  for (let action of actions) {
    switch (action) {
      case 'gamer-add':
        if (!isUserNameExist(UserName)) {
          const newUser = {...new Gamer(UserName)};
          newUser.id = updatedStorage.gamers.length 
            ? updatedStorage.gamers[updatedStorage.gamers.length - 1].id + 1
            : 1;
          updatedStorage.gamers.push(newUser);
        }
        break;

      case 'gamer-delete':
        if (isUserNameExist(UserName)) {
          updatedStorage.gamers.forEach(gamer => {
            if (gamer.name === UserName) {
              const gamerIndex = updatedStorage.gamers.indexOf(gamer);
              updatedStorage.gamers.splice(gamerIndex, 1);
            }
          })
        }
        break;

      case 'gamer-game-add':
        if (isUserNameExist(UserName)) {
          const newUserGame = {...new NewGame(gameTitle, gameCategory, 'not-finished', getTodayDate())};

          updatedStorage.gamers.forEach(gamer => {
            if (gamer.name === UserName && !isUserHasGame(gamer, gameTitle)) {
              gamer.games.push(newUserGame);
            }
          })
        }
        break;

      case 'gamer-game-clean':
        if (isUserNameExist(UserName)) {
          updatedStorage.gamers.forEach(gamer => {
            if (gamer.name === UserName) {
              gamer.games = [];
            }
          })
        }
        break;

      case 'gamer-game-status-win':
        if (isUserNameExist(UserName)) {
          updatedStorage.gamers.forEach(gamer => {
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
          updatedStorage.gamers.forEach(gamer => {
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

  fs.writeJsonSync(pathToGamers, updatedStorage, { spaces: 2 })
}

export {changeGamersList}
