import {useSelector,useDispatch} from 'react-redux'
import {pause,resume,restart} from '../actions'
import {Button,TextDisplay} from './ScoreBoard'
import socket from '../socket'
export default function MultiScoreBoard({player}){
    const game=useSelector((state)=>state[player])
    const {score,lines,level}=game;
    return(
        <>
            <div className="scoreboard">
                <TextDisplay
                    metric="Score"
                    value={score}
                />
                <TextDisplay
                    metric="Lines"
                    value={lines}
                />
                <TextDisplay
                    metric="Level"
                    value={level}
                />
            </div>
        </>
    );
}
export function MultiButtons({player}){
    const game=useSelector((state)=>state[player])
    const {isRunning,gameOver}=game;
    return(
        <>
            <Button onClick={()=>{
                    if(gameOver){
                        return;
                    }
                    if(isRunning){
                        socket.emit("pauseFromClient",{roomId:game.roomId});
                    }
                    else{
                        socket.emit("resumeFromClient",{roomId:game.roomId});
                    }
                }
            } text={isRunning?'Pause':'Play'}></Button>
            <Button onClick={()=>{
                socket.emit("restartFromClient",{roomId:game.roomId});
            }} text="Restart"></Button>
        </>
    );
}
