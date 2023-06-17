import {useSelector,useDispatch} from 'react-redux'
import {pause,resume,restart} from './actions'
import {moveDown,moveLeft,moveRight,rotate} from './actions'
import {useEffect} from 'react'
export default function ScoreBoard(){
    const dispatch=useDispatch();
    const game=useSelector((state)=>state.game)
    const {isRunning,score,lines,level,gameOver}=game;
    
    useEffect(()=>{
        const handleKeyDown=(e)=>{
            if(isRunning&&!gameOver){
                switch(e.key){
                    case 'ArrowLeft':
                        dispatch(moveLeft());
                        break;
                    case 'ArrowUp':
                        dispatch(rotate());
                        break;
                    case 'ArrowRight':
                        dispatch(moveRight());
                        break;
                    case 'ArrowDown':
                        dispatch(moveDown());
                }
            }
        };
        document.addEventListener('keydown',handleKeyDown)
        return ()=>{
            document.removeEventListener('keydown',handleKeyDown)
        };
    },[!isRunning||gameOver]);
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