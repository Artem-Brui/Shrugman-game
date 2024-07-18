
//EXTERNAL SERVICES
var FS = require('fs');

//CONTENT
const LINK_SPEAKING = require('../content/speaking-base.json');
const LINK_TITLES = require('../content/titles-base.json');
const LINK_PICTURES = require('../content/pictures-base.json');
const LINK_GAMERS_LIST = require('../content/gamers-base.json');

//SCRIPTS-IMPORT
const {
  game,
  getGameTitle,
  userAnswer,
  getCommandToStart,
  nameIsValid,
  nameChanger
 } = require('../main.js');

//CLASSES-IMPORT
const {
  Gamer,
  NewGame
 } = require('./classes.js');



 




//#region FUNCTION changeGamersList() that create new item in the gamers list. Nothing to return, just aside affect.

const isUserNameExist = userName => LINK_GAMERS_LIST.gamers.some(gamer => gamer["name"] === userName);

function changeGamersList(pathToGamers, newUserName, action) {
  let currentJson = {};
  
  FS.readFile(pathToGamers, 'utf8', (err, data) => {
    if (err) {
      console.error('Can\'t read file:', err);
      return;
    }

    currentJson = JSON.parse(data);

    switch (action) {
      case 'add-new-gamer':
        const newUser = new Gamer(newUserName);
        newUser.id = currentJson.gamers[currentJson.gamers.length - 1].id + 1;
        currentJson.gamers.push(newUser);
        console.log(currentJson.gamers);
        break;
      case 'delete-gamer':
        for (const user of currentJson.gamers) {
          if (user.name === newUserName) {
            currentJson.gamers.splice(currentJson.gamers.indexOf(user), 1);
          }
        }
        break;
      case 'add-new-game-to-user2':
        if (isUserNameExist(newUserName)) {
          currentJson.gamers.forEach(element => {
            if (element.name === newUserName) {
              element.games.push(new NewGame('title', 'categoryName', 'gameStatus', 'lastGameDate'));
            }
          });
          
        }
    }

    const jsonString = JSON.stringify(currentJson, null, 2);
    FS.writeFile(pathToGamers, jsonString, (err) => {
        if (err) {
            console.error('Can\'t write file', err);
        }
      });
  });
}

// const obj = {...LINK_GAMERS_LIST.gamers[1]};
// obj.addNewGame('title', 'categoryName', 'gameStatus', 'lastGameDate')

// console.clear();
// console.log(obj);
// changeGamersList(LINK_GAMERS_LIST, 'ar', 'add-new-game-to-user')

//#endregion ==============


module.exports = { 
  isUserNameExist,
  changeGamersList
};