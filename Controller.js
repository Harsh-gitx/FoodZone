//require Express 
const express=require('express');
const bodyParser=require('body-parser');
const cors=require('cors');
const cookie=require('cookie-parser');
const router=require('./Routing')
const socket=require('socket.io');
const app=express();

app.use(bodyParser.json());
app.use(cors());
app.use(router)

const server=app.listen('3000',()=>{
    console.log('server started');
})
let io=socket(server);

io.on('connection', (socket)=>{
    socket.on('msg',(message)=>{
        console.log(message);
        socket.emit('msg2',message)
        socket.broadcast.emit('msg3',message)
    })
})