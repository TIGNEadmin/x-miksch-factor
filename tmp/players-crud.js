// const fs = require("fs");

var fs = require("fs");

let players = require("./players.json");

export const playerActions = {
  addPlayer,
  getAll,
  deletePlayer,
  deleteAll,
  newRound,
  submitX,
};

function getAll() {
  return players;
}

function submitX(name) {
  for (var i = 0; players.length; i++) {
    var playerName = players[i].name;
    console.log(playerName, name);
    if (playerName == name) {
      players[i].x = true;
      break;
    } else {
      console.log("Couldnt find that name");
    }
  }
  var writeData = JSON.stringify(players);
  fs.writeFileSync("./tmp/players.json", writeData);
}

function addPlayer(player) {
  if (players.some((e) => e.name === player.name)) {
    console.log("That name exists");
  } else {
    if (player.name != undefined) {
      players.push(player);
      var writeData = JSON.stringify(players);
      fs.writeFileSync("./tmp/players.json", writeData);
    }
  }
}

function deletePlayer(name) {
  console.log("Name from func: ", name);

  players = players.filter((player) => player.name !== name);

  // if (players.some((e) => e.name === name)) {
  //   players.pop(e);
  // }

  var writeData = JSON.stringify(players);
  fs.writeFileSync("./tmp/players.json", writeData);
}

function newRound() {
  players.map((player) => {
    player.x = false;
  });
  var writeData = JSON.stringify(players);
  fs.writeFileSync("./tmp/players.json", writeData);
}

function deleteAll() {
  players = [];
  var writeData = JSON.stringify(players);
  fs.writeFileSync("./tmp/players.json", writeData);
}
