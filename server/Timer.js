
const { moveDown } = require('./actions');
const { gameReducer } = require('./GameReducer');
const { setGameState, getGameState,getGameStates } = require('./gameState');
const BLOCK_MOVE_INTERVAL = 1000; // Interval for block movement in milliseconds

let timerInterval;
let isRunning = false;

// Function to trigger downwards block movement
function moveBlockDown(player) {
  // Implement your block movement logic here
  setGameState(player,gameReducer(getGameState(player),moveDown()));
}
// Function to start the timer
function startTimer(Id,io) {
  if (!isRunning) {
    timerInterval = setInterval(()=>{
      moveBlockDown("player1");
      moveBlockDown("player2");
      const gameStatePayload = getGameStates();
      io.in(Id).emit('gameState', gameStatePayload);
      console.log("received")
    }, BLOCK_MOVE_INTERVAL);
    isRunning = true;
  }
}

// Function to pause the timer
function pauseTimer() {
  if (isRunning) {
    clearInterval(timerInterval);
    isRunning = false;
  }
}
function resetTimer() {
    clearInterval(timerInterval);
    isRunning = false;
}

module.exports = {
  moveBlockDown,
  startTimer,
  pauseTimer,
  resetTimer,
};