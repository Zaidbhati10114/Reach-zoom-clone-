const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server)
const {ExpressPeerServer} = require('peer');
const peerServer = ExpressPeerServer(server,{
    debug:true
});
app.set('view engine','ejs');
app.use(express.static('public'));
app.use("/peerjs",peerServer);
const {v4:uuidv4}=require('uuid');


app.get('/',(req,res) => {
    res.redirect(`/${uuidv4()}`);
})

// to make a Unique room id  and fetch the url 

app.get('/:room',(req,res)=> {

    res.render('room',{ roomId:req.params.room});

})

// Create a connection and channel via socket.io

io.on('connection',socket => {

    // when user joins the room 
    socket.on('join-room',(roomId,userId) => {
         socket.join(roomId);

        //  brodcast the channel
         socket.to(roomId).broadcast.emit('user-connected',userId);


         //When user is connected we have recieve the message

          socket.on('message',message => {
              io.to(roomId).emit('createMessage',message)
          })
        

    })

})








server.listen(7007);