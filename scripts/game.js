var readlineSync = require('readline-sync');

//CONTENT
const LINK_SPEAKING = require('../content/speaking-base.json');
const LINK_TITLES = require('../content/titles-base.json');
const LINK_PICTURES = require('../content/pictures-base.json');
const LINK_GAMERS_LIST = require('../content/gamers-base.json');

// const {
//   userAnswer
//  } = require('../main.js');




//==EXPORT
module.exports = { 
  gameRound,
  getGameTitle 
};