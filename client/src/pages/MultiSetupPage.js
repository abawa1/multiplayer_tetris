import '../GamePage.css';
import { useEffect, useState, useCallback } from "react";
import socket from '../socket'
import {Link} from 'react-router-dom'

function JoinRoom({setRoom,setPlayers}){
    const [roomInput, setRoomInput] = useState('');
    const [roomError, setRoomError] = useState('');
    const handleIDChange = (e) => {
      setRoomInput(e.target.value);
    };
  
    const handleSubmit = () => {
      if (!roomInput) {
        return;
      }
      socket.emit("joinRoom",{roomId:roomInput},(r)=>{
        if(r.error){
            return setRoomError(r.messgae);
        }
        console.log("response:",r);
        setRoom(r?.roomId);
        setPlayers(r?.players);
      })
    }
  return (
      <div className="join-container inactive">
          <h2>Enter a valid room ID</h2>
          <form className="id-form">
              <input
                  type="text"
                  id="id"
                  name="id"
                  className="id-input"
                  onChange={handleIDChange}
                  required
              />
              <br />
              <Link to={roomInput ? "/Play" : ""}>
                    <input
                        type="button"
                        value="Submit"
                        className="id-button"
                        onClick={handleSubmit}
                        />
              </Link>
          </form>            
      </div>
  );
}

function GameRoom({setRoom}){
    return (
        <div className="gameroom-container inactive">
            <Link to= "/Play">
                <button className="start-game" onClick={
                    ()=>{
                        socket.emit("createRoom",(r)=>{
                            console.log(r);
                            setRoom(r);
                        })
                    }
                }>Start a Game</button>
            </Link>
            <button className="start-game" onClick={
                ()=>{
                    const gameroomContainer=document.querySelector('.gameroom-container');
                    gameroomContainer.classList.add('inactive');
                    const joinContainer=document.querySelector('.join-container');
                    joinContainer.classList.remove('inactive');
                }
            }>Join a Game</button>
        </div>
    );
}
function Dialogue(){
    const [username, setUsername] = useState('');
    const handleUsernameChange = (e) => {
        setUsername(e.target.value);
      };
    
      const handleSubmit = () => {
        if (!username) {
          return;
        }
        socket.emit("username", username);
        const dialogueContainer=document.querySelector('.dialogue-container');
        dialogueContainer.classList.add('inactive');
        const gameroomContainer=document.querySelector('.gameroom-container');
        gameroomContainer.classList.remove('inactive');
      };
    return (
        <div className="dialogue-container">
            <h2>Enter Username</h2>
            <p>Please enter a username</p>
            <br></br>
            <form className="username-form">
                <input
                    type="text"
                    id="username"
                    name="username"
                    className="username-input"
                    onChange={handleUsernameChange}
                    required
                />
                <br />
                <input
                    type="button"
                    value="Submit"
                    className="username-button"
                    onClick={handleSubmit}
                    />
            </form>
        </div>
    );
}
export default function MultiSetupPage(){
    const [room, setRoom] = useState("");
    const [orientation, setOrientation] = useState("");
    const [players, setPlayers] = useState([]);

    const cleanup = useCallback(() => {
        setRoom("");
        setOrientation("");
        setPlayers("");
      }, []);
    
    useEffect(() => {
        socket.on("opponentJoined", (roomData) => {
            console.log("roomData", roomData)
            setPlayers(roomData.players);
        });
    }, []);

    return (
        <div className="container">
            <Dialogue></Dialogue>
            <GameRoom setRoom={setRoom}></GameRoom>
            <JoinRoom setRoom={setRoom} setPlayers={setPlayers}></JoinRoom>
        </div>
    );
}