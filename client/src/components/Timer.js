import {useSelector, useDispatch} from 'react-redux'
import {useEffect,useRef} from 'react'
import {moveDown} from '../actions'
const Timer=()=>{
    const game=useSelector((state)=>state.game);
    const {isRunning,speed}=game;
    const requestRef=useRef();
    const lastUpdateTimeRef=useRef(0);
    const progressTimeRef=useRef(0);
    const dispatch=useDispatch();
    const update=(time)=>{
        requestRef.current=requestAnimationFrame(update);
        if(!isRunning){
            return;
        }
        if(!lastUpdateTimeRef.current){
            lastUpdateTimeRef.current=time;
        }
        const deltaTime=time-lastUpdateTimeRef.current;
        progressTimeRef.current+=deltaTime;
        if(progressTimeRef.current>speed){
            dispatch(moveDown());
            progressTimeRef.current=0;
        }
        lastUpdateTimeRef.current=time;
    }
    useEffect(()=>{
        requestRef.current=requestAnimationFrame(update);
        return ()=>cancelAnimationFrame(requestRef.current)
    },[isRunning]);
    
}
export default Timer;