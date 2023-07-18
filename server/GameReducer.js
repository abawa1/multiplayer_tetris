const actions=require('./actions')
const index=require('./index')

const gameReducer=(state=index.defaultGameState(),action)=>{
    const {piece, grid, x, y, rotation, nextPiece, score, isRunning,level,lines,roomId } = state
    switch(action.type){
        case actions.ROTATE:
            const newRotation=index.nextRotation(piece,rotation);
            if(index.canMoveTo(piece,grid,x,y,newRotation)){
                return {...state,rotation:newRotation};
            }
            return state;
        case actions.MOVE_RIGHT:
            if(index.canMoveTo(piece,grid,x+1,y,rotation)){
                return {...state,x:x+1};
            }
            return state;
        case actions.MOVE_LEFT:
            if(index.canMoveTo(piece,grid,x-1,y,rotation)){
                return {...state,x:x-1};
            }
            return state;
        case actions.MOVE_DOWN:
            const newY=y+1;
            if(index.canMoveTo(piece,grid,x,newY,rotation)){
                return {...state,y:newY};
            }
            const obj=index.addBlockToGrid(piece,grid,x,y,rotation);
            const newGrid=obj.grid;
            const gameOver=obj.gameOver;
            if(gameOver){
                const newState={...state};
                newState.piece=0;
                newState.grid=newGrid;
                return {...state,gameOver:true};
            }
            const newState=index.defaultGameState();
            newState.roomId=roomId;
            newState.grid=newGrid;
            newState.piece=nextPiece;
            newState.nextPiece=index.generateRandomPiece();
            newState.isRunning=isRunning;
            if(!index.canMoveTo(nextPiece,newGrid,0,4,0)){
                console.log('Game over');
                newState.piece=0;
                return {...state,gameOver:true};
            }
            let res=index.checkRows(newGrid,level);
            newState.score=score+res[0];
            newState.lines=lines+res[1];
            newState.level=level;
            if(lines!==0&&lines%10===0){
                newState.level+=1;
            }
            return newState;
        case actions.RESUME:
            return {...state,isRunning:true};
        case actions.PAUSE:
            return {...state,isRunning:false};
        case actions.GAME_OVER:
            return state;
        case actions.RESTART:
            const newGame=index.defaultGameState();
            newGame.roomId=roomId;
            return newGame;
        default:
            return state;
    }
}
module.exports={
    gameReducer
}