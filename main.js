


//--SCRIPTS IMPORT
import {
  startNewRound, 
  isUserNameExist,
  getUserName,
  changeGamersList,
  getGameTitle,
  SPEAKING_BASE,
  TITLES_BASE,
  PICTURES_BASE,
  GAMERS_LIST_BASE
} from './scripts/direct-functions.js';


//===GAME-STEPS
function letStart() {
  // get user name
  let currentUserName = getUserName();

  // start new round
  startNewRound(currentUserName);
}


//console.clear()
//console.log(getGameTitle('userName', 'books'))

letStart()


//console.log(GAMERS_LIST_BASE.gamers);

//gameScreen(['welcome'], ['greeting'])
//changeGamersList("user", ["gamer-add", "gamer-game-add"], "gameTitle", "gameCategory")

// const SPEAKING_BASE = JSON.parse(await fs.readFile('./content/speaking-base.json', 'utf8'));
// const TITLES_BASE = JSON.parse(await fs.readFile('./content/titles-base.json', 'utf8'));
// const PICTURES_BASE = JSON.parse(await fs.readFile('./content/pictures-base.json', 'utf8'));
// const GAMERS_LIST_BASE = JSON.parse(await fs.readFile('./content/gamers-base.json', 'utf8'));