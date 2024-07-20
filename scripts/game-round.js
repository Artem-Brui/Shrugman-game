

import {
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
} from './direct-functions.js';


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

    for (let character of title) {
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
      gameScreen(['thinking'], [`\n${gameTitle}\n`, `\n${gameShragman}\n`]);

      needToRepeat
        ? letterForChecking = userAnswer(`${SPEAKING_BASE.userLetterInputRepeat}`)
        : letterForChecking = userAnswer(`${SPEAKING_BASE.userLetterInput}`);
      
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
      gameScreen(['sad'], [`\n${gameTitle}\n`, `\n${SPEAKING_BASE.loser}\n`])
      break;
    case 'win':
      gameScreen(['sad'], [`\n${gameTitle}\n`, `\n${SPEAKING_BASE.winnner}\n`])
      break;
  }

    return gameStatus;
}

// console.clear()
// console.log(gameScreen('welcome'));


export {gameRound};
