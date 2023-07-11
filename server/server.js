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

io.on('connection',(socket)=>{
    console.log(socket.id,'connected');
    socket.on('username',(username)=>{
        console.log('username:',username);
        socket.data.username=username;
    })
})

server.listen(port, () => {
    console.log(`listening on *:${port}`);
});