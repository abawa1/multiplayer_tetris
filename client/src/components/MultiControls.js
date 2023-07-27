import {useSelector} from 'react-redux'
import {useEffect} from 'react'
import {clientUsername} from '../pages/MultiSetupPage'
import socket from '../socket'
const Controls=()=>{
    const player1=useSelector((state)=>state["player1"])
    const player2=useSelector((state)=>state["player2"])
    const isRunning=player1.isRunning&&player2.isRunning;
    const gameOver=player1.gameOver||player2.gameOver;
    const roomId=player1.roomId;
    useEffect(()=>{
        const handleKeyDown=(e)=>{
            if(isRunning&&!gameOver){
                switch(e.key){
                    case 'ArrowLeft':
                        socket.emit("keyPressed",{roomId:player2.roomId,action:"moveLeftFromClient",playerId:clientUsername});
                        break;
                    case 'ArrowUp':
                        socket.emit("keyPressed",{roomId:player2.roomId,action:"rotateFromClient",playerId:clientUsername});
                        break;
                    case 'ArrowRight':
                        socket.emit("keyPressed",{roomId:player2.roomId,action:"moveRightFromClient",playerId:clientUsername});
                        break;
                    case 'ArrowDown':
                        socket.emit("keyPressed",{roomId:player2.roomId,action:"moveDownFromClient",playerId:clientUsername});
                        break;
                    case 'a'||'A':
                        socket.emit("keyPressed",{roomId:player1.roomId,action:"ALeftFromClient",playerId:clientUsername});
                        break;
                    case 'w'||'W':
                        socket.emit("keyPressed",{roomId:player1.roomId,action:"WRotateFromClient",playerId:clientUsername});
                        break;
                    case 's'||'S':
                        socket.emit("keyPressed",{roomId:player1.roomId,action:"SDownFromClient",playerId:clientUsername});
                        break;
                    case 'd'||'D':
                        socket.emit("keyPressed",{roomId:player1.roomId,action:"DRightFromClient",playerId:clientUsername});
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
    },[!isRunning||gameOver,roomId]);
    return (<></>)
}
export default Controls;