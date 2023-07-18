import {useSelector,useDispatch} from 'react-redux'
import {moveDown,moveLeft,moveRight,rotate} from '../actions'
import {useEffect} from 'react'
const Controls=()=>{
    const dispatch=useDispatch();
    const game=useSelector((state)=>state.game)
    const {isRunning,gameOver}=game;
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
                        break;
                    default:
                        break;
                }
            }
        };
        document.addEventListener('keydown',handleKeyDown)
        return ()=>{
            document.removeEventListener('keydown',handleKeyDown)
        };
    },[!isRunning||gameOver]);
}
export default Controls;