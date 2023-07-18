const index=require('./index')
const timer=require('./Timer')
const express=require('express')
const {Server}=require("socket.io")
const {v4:uuidV4}=require("uuid");
const http=require("http");
const gameStates=require('./gameState')
const { gameReducer } = require('./GameReducer');
const { pause,resume,restart,gameOver } = require('./actions');
const app=express();
const server=http.createServer(app);
const port=process.env.PORT||8080;

const io=new Server(server,{
    cors:'*'
});

const rooms=new Map();

io.on('connection',(socket)=>{
    console.log(socket.id,'connected');
    socket.on('username',(username)=>{
        console.log('username:',username);
        socket.data.username=username;
    })
    socket.on('createRoom',async(callback)=>{
        const roomId=uuidV4();
        await socket.join(roomId);

        rooms.set(roomId,{
            roomId,
            players:[{id:socket.id,username:socket.data?.username}]
        })
        callback(roomId);
    })
    socket.on('joinRoom', async (args, callback) => {
        const room = rooms.get(args.roomId);
        let error, message;
      
        if (!room) { // if room does not exist
          error = true;
          message = 'room does not exist';
        } else if (room.length <= 0) { // if room is empty set appropriate message
          error = true;
          message = 'room is empty';
        } else if (room.length >= 2) { // if room is full
          error = true;
          message = 'room is full'; // set message to 'room is full'
        }
    
        if (error) {
          // if there's an error, check if the client passed a callback,
          // call the callback (if it exists) with an error object and exit or 
          // just exit if the callback is not given
    
          if (callback) { // if user passed a callback, call it with an error payload
            callback({
              error,
              message
            });
          }
    
          return; // exit
        }
        await socket.join(args.roomId); // make the joining client join the room
        // add the joining user's data to the list of players in the room
        const roomUpdate = {
          ...room,
          players: [
            ...room.players,
            { id: socket.id, username: socket.data?.username },
          ],
        };
        let gameState1=index.defaultGameState();
        let gameState2=index.defaultGameState();
        gameState1.roomId=args.roomId;
        gameState2.roomId=args.roomId;
        gameStates.setGameState("player1",gameState1);
        gameStates.setGameState("player2",gameState2);
        rooms.set(args.roomId, roomUpdate);
        callback(roomUpdate,gameStates.getGameState("player1"),gameStates.getGameState("player2")); // respond to the client with the room details.
        // emit an 'opponentJoined' event to the room to tell the other player that an opponent has joined
        io.in(args.roomId).emit('opponentJoined', roomUpdate,gameStates.getGameState("player1"),gameStates.getGameState("player2"));
        timer.startTimer(args.roomId,io);
      });
      socket.on("pauseFromClient",async(args)=>{
        timer.pauseTimer();
        gameStates.setGameState("player1",gameReducer(gameStates.getGameState("player1"),pause()));
        gameStates.setGameState("player2",gameReducer(gameStates.getGameState("player2"),pause()));
        io.in(args.roomId).emit("pause",gameStates.getGameState("player1"),gameStates.getGameState("player2"))
      });
      socket.on("resumeFromClient",async (args)=>{
        timer.startTimer(args.roomId,io);
        gameStates.setGameState("player1",gameReducer(gameStates.getGameState("player1"),resume()));
        gameStates.setGameState("player2",gameReducer(gameStates.getGameState("player2"),resume()));
        io.in(args.roomId).emit("resume",gameStates.getGameState("player1"),gameStates.getGameState("player2"))
      });
      socket.on("restartFromClient",async (args)=>{
        timer.resetTimer();
        gameStates.setGameState("player1",gameReducer(gameStates.getGameState("player1"),restart()));
        gameStates.setGameState("player2",gameReducer(gameStates.getGameState("player2"),restart()));
        io.in(args.roomId).emit("restart",gameStates.getGameState("player1"),gameStates.getGameState("player2"))
        timer.startTimer(args.roomId,io);
      });
      socket.on("gameOver",async (args)=>{
        timer.resetTimer();
        gameStates.setGameState("player1",gameReducer(gameStates.getGameState("player1"),gameOver()));
        gameStates.setGameState("player2",gameReducer(gameStates.getGameState("player2"),gameOver()));
        //io.in(args.roomId).emit("gameOver",gameStates.getGameState("player1"),gameStates.getGameState("player2"))
      })
});

server.listen(port, () => {
    console.log(`listening on *:${port}`);
});