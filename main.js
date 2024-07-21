
//--SCRIPTS IMPORT
import {
  gameSteps,
  PICTURES_BASE,
  animeMaker,
  getUserName
} from './scripts/direct-functions.js';


async function letStart() {
  console.clear();
  // get user name  
  await animeMaker(PICTURES_BASE["smile-anime"], PICTURES_BASE["smile"], 40, ['blue', 'cyan']);
  let currentUserName = getUserName();
  gameSteps(currentUserName);

} 

letStart()

//--EXPORT
export { letStart };