//CONTENT
const LINK_SPEAKING = require('../content/speaking-base.json');
const LINK_TITLES = require('../content/titles-base.json');
const LINK_PICTURES = require('../content/pictures-base.json');
const LINK_GAMERS_LIST = require('../content/gamers-base.json');

const {
  userAnswer
 } = require('../main.js');


//===FUNCTION choiseCategory()<< 
const choiseCategory = item => {
  
}


//===FUNCTION getGameTitle()<< that return a title(string) for new game and put it to user list as object with full data about game. Gamer must exist in the file gamers
function getGameTitle(userName, category) {
  console.clear();
  let titleForGame;
  const userGameList = LINK_GAMERS_LIST.gamers.filter((user) => user.name === userName)[0].games;
  const fullGameList = LINK_TITLES[category];

  do {
    const randomIndex = Math.floor(Math.random() * fullGameList.length)
    titleForGame = fullGameList[randomIndex];
  } while (userGameList.includes(titleForGame));

  return titleForGame;
}

//#endregion


//GAME-LOGIK

//#region >>FUNCTION game()<< that return a status(string) of game result "not-finished", "win" or "lose"
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
      console.log(`${LINK_PICTURES.thinking}\n`);
      console.log(`\n${gameTitle}\n`);
      console.log(`\n${gameShragman}\n`);

      needToRepeat
        ? letterForChecking = userAnswer(`${LINK_SPEAKING.repeatChoiceWithLetter}`)
        : letterForChecking = userAnswer(`${LINK_SPEAKING.makeChoiceWithLetter}`);
      
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
      console.log(`${LINK_PICTURES.sad}\n`);
      console.log(`\n${gameTitle}\n`);
      console.log(`\n${LINK_SPEAKING.loser}\n`);
      break;
    case 'win':
      console.log(`${LINK_PICTURES.win}\n`);
      console.log(`\n${gameTitle}\n`);
      console.log(`\n${LINK_SPEAKING.winner}\n`);
      break;
  }

    return gameStatus;
}

//#endregion


//==EXPORT
module.exports = { 
  gameRound,
  getGameTitle 
};