const express=require('express')
const {Server}=require("socket.io")
const {v4:uuidV4}=require("uuid");
const http=require("http");

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
    
        rooms.set(args.roomId, roomUpdate);
    
        callback(roomUpdate); // respond to the client with the room details.
    
        // emit an 'opponentJoined' event to the room to tell the other player that an opponent has joined
        socket.to(args.roomId).emit('opponentJoined', roomUpdate);
      });
})

server.listen(port, () => {
    console.log(`listening on *:${port}`);
});