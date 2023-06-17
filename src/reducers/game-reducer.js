import{
    MOVE_RIGHT, MOVE_LEFT, MOVE_DOWN, ROTATE,
  PAUSE, RESUME, RESTART, GAME_OVER
} from '../actions'
import {defaultGameState,nextRotation,canMoveTo,addBlockToGrid,checkRows,generateRandomPiece} from '../utils'

const gameReducer=(state=defaultGameState(),action)=>{
    const {piece, grid, x, y, rotation, nextPiece, score, isRunning,level,lines } = state
    switch(action.type){
        case ROTATE:
            const newRotation=nextRotation(piece,rotation);
            if(canMoveTo(piece,grid,x,y,newRotation)){
                return {...state,rotation:newRotation};
            }
            return state;
        case MOVE_RIGHT:
            if(canMoveTo(piece,grid,x+1,y,rotation)){
                return {...state,x:x+1};
            }
            return state;
        case MOVE_LEFT:
            if(canMoveTo(piece,grid,x-1,y,rotation)){
                return {...state,x:x-1};
            }
            return state;
        case MOVE_DOWN:
            const newY=y+1;
            if(canMoveTo(piece,grid,x,newY,rotation)){
                return {...state,y:newY};
            }
            const obj=addBlockToGrid(piece,grid,x,y,rotation);
            const newGrid=obj.grid;
            const gameOver=obj.gameOver;
            if(gameOver){
                const newState={...state};
                newState.piece=0;
                newState.grid=newGrid;
                return {...state,gameOver:true};
            }
            const newState=defaultGameState();
            newState.grid=newGrid;
            newState.piece=nextPiece;
            newState.nextPiece=generateRandomPiece();
            newState.isRunning=isRunning;
            if(!canMoveTo(nextPiece,newGrid,0,4,0)){
                console.log('Game over');
                newState.piece=0;
                return {...state,gameOver:true};
            }
            let res=checkRows(newGrid,level);
            newState.score=score+res[0];
            newState.lines=lines+res[1];
            newState.level=level;
            if(lines!==0&&lines%10===0){
                newState.level+=1;
            }
            return newState;
        case RESUME:
            return {...state,isRunning:true};
        case PAUSE:
            return {...state,isRunning:false};
        case GAME_OVER:
            return state;
        case RESTART:
            return defaultGameState();
        default:
            return state;
    }
}
export default gameReducer;