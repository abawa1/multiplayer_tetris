let gameStates = {};

function setGameState(playerId, state) {
  gameStates[playerId] = state;
}

function getGameState(playerId) {
  return gameStates[playerId];
}
function getGameStates(){
  return gameStates;
}

module.exports = {
  setGameState,
  getGameState,
  getGameStates
};