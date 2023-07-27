import {useSelector} from 'react-redux'
import socket from '../socket'
export default function MultiPopup(){
    const game=useSelector((state)=>state["player1"])
    const game2=useSelector((state)=>state["player2"])
    const isRunning=useSelector((state)=>(state["player1"].isRunning)&&state["player2"].isRunning);
    const gameOver=useSelector((state)=>state["player1"].gameOver||state["player2"].gameOver);
    const player1score=useSelector((state)=>state["player1"].score);
    const player2score=useSelector((state)=>state["player2"].score);
    let message='';
    let isHidden='hidden';
    if(gameOver){
        socket.emit("gameOver",{roomId:game.roomId});
        message='Game Over!'
        if(game2.gameOver){
            message+=` ${game.playerId} wins!`
        }
        else if(game.gameOver){
            message+=` ${game2.playerId} wins!`
        }
        else if(game.gameOver&&game2.gameOver){
            message+=' Tie!'
        }
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