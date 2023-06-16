import {useSelector,useDispatch} from 'react-redux'
import {useState} from 'react';
import {pause,resume,restart} from './actions'
export default function ScoreBoard(){
    const dispatch=useDispatch();
    const game=useSelector((state)=>state.game)
    const {isRunning,score,lines,level,gameOver}=game;
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
            <Button onClick={(e)=>{
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
            <Button onClick={(e)=>{
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
    if(props.id==="resume"&&!props.shouldResume){
        return null;
    }
    if(props.id==="pause"&&props.shouldResume){
        return null;
    }
    return <button className="meta" id={props.id} onClick={props.onClick}>{props.text}</button>
}