import {useSelector,useDispatch} from 'react-redux'
import {pause,resume,restart,moveDown,moveLeft,moveRight,rotate} from '../actions'
import {useEffect} from 'react'
export default function ScoreBoard(){
    const game=useSelector((state)=>state.game)
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
export function Buttons(){
    const dispatch=useDispatch();
    const game=useSelector((state)=>state.game)
    const {isRunning,gameOver}=game;
    return(
        <>
            <Button onClick={()=>{
                    if(gameOver){
                        return;
                    }
                    if(isRunning){
                        dispatch(pause());
                    }
                    else{
                        dispatch(resume());
                    }
                }
            } text={isRunning?'Pause':'Play'}></Button>
            <Button onClick={()=>{
                dispatch(restart());
            }} text="Restart"></Button>
        </>
    );
}
function TextDisplay({metric,value}){
    return (
        <h3>{metric}: {value}</h3>
    );
}
function Button(props){
    return <button className="meta" id={props.id} onClick={props.onClick}>{props.text}</button>
}