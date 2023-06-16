import {useSelector, useDispatch} from 'react-redux'
import {moveDown,moveLeft,moveRight,rotate} from './actions'
import {useEffect} from 'react'
export default function Controls(props){
    const dispatch=useDispatch();
    const isRunning=useSelector((state)=>state.game.isRunning);
    useEffect(()=>{
        document.addEventListener('keydown',detectKeyDown)
        return ()=>{
            document.removeEventListener('keydown',detectKeyDown)
        };
    },[]);
    const detectKeyDown=(e)=>{
        if(!isRunning){
            return;
        }
        e=e||window.e;
        switch(e.key){
            case 'ArrowLeft':
                e.preventDefault();
                dispatch(moveLeft());
                break;
            case 'ArrowUp':
                e.preventDefault();
                dispatch(rotate());
                break;
            case 'ArrowRight':
                e.preventDefault();
                dispatch(moveRight());
                break;
            case 'ArrowDown':
                e.preventDefault();
                dispatch(moveDown());
        }
    }
    return(<></>);
}