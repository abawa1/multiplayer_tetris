import {useSelector} from 'react-redux'
export default function Popup(props){
    const isRunning=useSelector((state)=>(state.game.isRunning));
    const gameOver=useSelector((state)=>state.game.gameOver);
    let message='';
    let isHidden='hidden';
    if(gameOver){
        message='Game Over'
        isHidden=''
    }
    else if(!isRunning){
        message='Paused'
        isHidden=''
    }
    return(
        <div className={`popup ${isHidden}`}>
            <h1>{message}</h1>
        </div>
        
    );
}
