import{
    MOVE_RIGHT, MOVE_LEFT, MOVE_DOWN, ROTATE,
  PAUSE, RESUME, RESTART, GAME_OVER
} from '../actions'
import {defaultGameState,nextRotation,canMoveTo} from '../utils'

const gameReducer=(state=defaultGameState(),action)=>{
    const {piece, grid, x, y, rotation, nextPiece, score, isRunning } = state
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
            return state;
        case RESUME:
            return state;
        case PAUSE:
            return state;
        case GAME_OVER:
            return state;
        case RESTART:
            return state;
        default:
            return state;
    }
}
export default gameReducer;