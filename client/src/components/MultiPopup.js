import {useSelector} from 'react-redux'
import socket from '../socket'
export default function MultiPopup(){
    const game=useSelector((state)=>state["player1"])
    const isRunning=useSelector((state)=>(state["player1"].isRunning)&&state["player2"].isRunning);
    const gameOver=useSelector((state)=>state["player1"].gameOver||state["player2"].gameOver);
    let message='';
    let isHidden='hidden';
    if(gameOver){
        socket.emit("gameOver",{roomId:game.roomId});
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