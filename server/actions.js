const PAUSE="PAUSE";
const RESUME="RESUME";
const RESTART="RESTART";
const MOVE_LEFT="MOVE_LEFT";
const MOVE_RIGHT="MOVE_RIGHT";
const ROTATE="ROTATE";
const MOVE_DOWN="MOVE_DOWN";
const GAME_OVER="GAME_OVER";

const moveRight=()=>{
    return {type:MOVE_RIGHT};
}
const moveLeft=()=>{
    return {type:MOVE_LEFT};
}
const rotate=()=>{
    return {type:ROTATE};
}
const moveDown=()=>{
    return {type:MOVE_DOWN};
}
const pause=()=>{
    return {type:PAUSE};
}
const resume = () => {
    return { type: RESUME };
}
const restart = () => {
    return { type: RESTART };
}
const gameOver=()=>{
    return {type: GAME_OVER};
}
module.exports={
    PAUSE,
    RESUME,
    RESTART,
    MOVE_LEFT,
    MOVE_RIGHT,
    ROTATE,
    MOVE_DOWN,
    GAME_OVER,
    moveRight,
    moveLeft,
    rotate,
    moveDown,
    pause,
    resume,
    restart,
    gameOver
};