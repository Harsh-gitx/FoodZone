let socket=io.connect("http://localhost:3000")

let send=()=>{
    let msg="message";
    socket.emit('msg',msg);
    
}
socket.on('msg2',(data)=>{console.log(data)})