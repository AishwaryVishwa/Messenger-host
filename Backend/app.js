const express =require('express')
const dotenv=require('dotenv')
const cookieParser=require('cookie-parser')
const cors = require('cors');
const {Server}=require('socket.io')
dotenv.config({path:'./config.env'})

const app=express();

app.use(cors({
    options:process.env.FRONT_URL
}))
app.use(express.json())
app.use(cookieParser())
require('./DATABASE/dbConnect')
app.use(require('./Router/auth'))

const  PORT=process.env.PORT || 8000;

 const server=app.listen(PORT,()=>{
    console.log(`server started at ${PORT} `);
})

console.log(process.env.FRONT_URL,"ye he aapke frontend ka url");
const io=new Server(server,{
    pingTimeout:60000,
    cors:{
        origin:process.env.FRONT_URL
    }
})


io.on('connection',(socket)=>{
    console.log(`connected to io ${socket}`);


    socket.on("setup",(user)=>{
        socket.join(user._id);
        console.log("user connected with own room ",user._id);
        socket.emit("connected",user._id);
    })

    socket.on('join-chat',(room)=>{
        socket.join(room);
        console.log('user joined room ',room);
    })

    socket.on("new-message",(newMessage)=>{
        console.log("new message send is in socket",newMessage);
        let chat=newMessage.chat;

        if(!chat.users) return console.log("chat.users are not defined");

        chat.users.forEach((user) => {

            console.log("running for each ",user);
            if(user._id===newMessage.sender._id)
            return;

            // socket.in(user._id).emit('message-received',newMessage);
            socket.in(user._id).emit('hii',newMessage)
        });

    })


    // socket.on("Hello",(data)=>{
    //     console.log("hello from client ",data);
    // })

    
})



// console.log(module);