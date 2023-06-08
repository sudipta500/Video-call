const {Server} = require('socket.io');


const io =new Server(8000,{
    cors:true
});

const emailToSocketMap=new Map();
const socketIdToEmailMap=new Map();

io.on('connection',(socket)=>{
    socket.on('room:join',(data)=>{
        const {email,room}=data;
        emailToSocketMap.set(email,socket.id);
        socketIdToEmailMap.set(socket.id,email);
        io.to(room).emit('user:join',{email,id:socket.id})
        socket.join(room);
        io.to(socket.id).emit('room:join',data)
    })
})