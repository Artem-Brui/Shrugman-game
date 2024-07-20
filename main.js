


//--SCRIPTS IMPORT
const {
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
} = require('./scripts/direct-functions.js');


//===GAME-STEPS
function letStart() {
  // get user name
  let currentUserName = getUserName();

  // start new round
  startNewRound(currentUserName);
}



letStart()
//console.clear()
//console.log();
//changeGamersList("UserName4466", ["gamer-add", "gamer-game-add"], "gameTitle", "gameCategory")

