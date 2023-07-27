const { moveDown } = require('./actions');
const { gameReducer } = require('./GameReducer');
const { setGameState, getGameState, getGameStates } = require('./gameState');
const BLOCK_MOVE_INTERVAL = 1000; // Interval for block movement in milliseconds

let timerTimeout;
let isRunning = false;

// Function to trigger downwards block movement
function moveBlockDown(player) {
  // Implement your block movement logic here
  setGameState(player, gameReducer(getGameState(player), moveDown()));
}

// Function to start the timer
function startTimer(roomId,io) {
  if (!isRunning) {
    const timerFunction = () => {
      if (isRunning) {
        moveBlockDown("player1");
        moveBlockDown("player2");
        io.in(roomId).emit('gameState', getGameState("player1"),getGameState("player2"));
        timerTimeout = setTimeout(timerFunction, BLOCK_MOVE_INTERVAL);
      }
    };

    isRunning = true;
    timerFunction();
    console.log("started")
  }
}

// Function to pause the timer
function pauseTimer() {
  console.log("paused")
  clearTimeout(timerTimeout);
  isRunning = false;
}

// Function to reset the timer
function resetTimer() {
  clearTimeout(timerTimeout);
  isRunning = false;
}

// Function to resume the timer
function resumeTimer(roomId,io) {
  isRunning = true;
  startTimer(roomId,io);
}

module.exports = {
  moveBlockDown,
  startTimer,
  pauseTimer,
  resetTimer,
  resumeTimer
};