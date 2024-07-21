

//--SCRIPTS IMPORT
import {
  gameSteps,
  chalk,
  gameRound,
  PICTURES_BASE,
  userAnswer,
  SPEAKING_BASE,
  GAMERS_LIST_BASE,
  animeMaker,
  getUserName,
  gameScreen
} from './scripts/direct-functions.js';


//===GAME-STEPS
async function letStart() {
  console.clear();
  // get user name  
  await animeMaker(PICTURES_BASE["smile-anime"], PICTURES_BASE["smile"], 40, ['blue', 'cyan']);
  let currentUserName = getUserName();
  gameSteps(currentUserName);

} 

// console.clear();
// gameScreen();

//console.log(chalk.red(PICTURES_BASE.top));

 
letStart()

//animeMaker(PICTURES_BASE["win-anime"], 300, ['blue', 'yellow']); 


export { letStart };