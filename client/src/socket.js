import {io} from "socket.io-client";
import { multiplayerReducer } from './reducers';
import {createStore} from 'redux';
import {useSelector} from 'react-redux'
const socket=io('localhost:8080');
const reducer=createStore(multiplayerReducer);
socket.on('gameState', (receivedGameState,receivedGameState2) => {
    const updatePlayer1State=()=>({
        type:'UPDATE_PLAYER1_STATE',
        payload:receivedGameState
    })
    const updatePlayer2State=()=>({
        type:'UPDATE_PLAYER2_STATE',
        payload:receivedGameState2
    })
    reducer.dispatch(updatePlayer1State())
    reducer.dispatch(updatePlayer2State())
});
socket.on("opponentJoined", (roomData,receivedGameState,receivedGameState2) => {
    const waitScreen=document.querySelector('.wait-screen')
    waitScreen.classList.add('inactive')
    const updatePlayer1State=()=>({
        type:'UPDATE_PLAYER1_STATE',
        payload:receivedGameState
    })
    const updatePlayer2State=()=>({
        type:'UPDATE_PLAYER2_STATE',
        payload:receivedGameState2
    })
    reducer.dispatch(updatePlayer1State())
    reducer.dispatch(updatePlayer2State())
    
});
socket.on("pause",(receivedGameState,receivedGameState2)=>{
    const updatePlayer1State=()=>({
        type:'UPDATE_PLAYER1_STATE',
        payload:receivedGameState
    })
    const updatePlayer2State=()=>({
        type:'UPDATE_PLAYER2_STATE',
        payload:receivedGameState2
    })
    reducer.dispatch(updatePlayer1State())
    reducer.dispatch(updatePlayer2State())
    console.log("paused")
})
socket.on("resume",(receivedGameState,receivedGameState2)=>{
    const updatePlayer1State=()=>({
        type:'UPDATE_PLAYER1_STATE',
        payload:receivedGameState
    })
    const updatePlayer2State=()=>({
        type:'UPDATE_PLAYER2_STATE',
        payload:receivedGameState2
    })
    reducer.dispatch(updatePlayer1State())
    reducer.dispatch(updatePlayer2State())
    console.log("resumed")
})
socket.on("restart",(receivedGameState,receivedGameState2)=>{
    const updatePlayer1State=()=>({
        type:'UPDATE_PLAYER1_STATE',
        payload:receivedGameState
    })
    const updatePlayer2State=()=>({
        type:'UPDATE_PLAYER2_STATE',
        payload:receivedGameState2
    })
    reducer.dispatch(updatePlayer1State())
    reducer.dispatch(updatePlayer2State())
    console.log("restarted")
})
socket.on("gameOver",(receivedGameState,receivedGameState2)=>{
    const updatePlayer1State=()=>({
        type:'UPDATE_PLAYER1_STATE',
        payload:receivedGameState
    })
    const updatePlayer2State=()=>({
        type:'UPDATE_PLAYER2_STATE',
        payload:receivedGameState2
    })
    reducer.dispatch(updatePlayer1State())
    reducer.dispatch(updatePlayer2State())
    console.log("ended game")
})
export {reducer};
export default socket;
