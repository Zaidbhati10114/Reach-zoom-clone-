//  Javascript login and fronEnd is going to live here


// Show out own video element(our own video)

// Allows us get the ability to get video and audio output from chrome
const socket = io("/");

const myVideo = document.createElement('video');
const videoGrid = document.getElementById('video-grid');
myVideo.muted=false;


// Create a new connection 

var peer = new Peer(undefined,{

    path:'/peerjs',
    host:'/',
    port:'7007'

});
     



let myVideoStream;
navigator.mediaDevices.getUserMedia({
    video:true,
    audio:true,
}).then(stream => {
    myVideoStream = stream;
    addVideoStream(myVideo,stream);

//Call the player and answer
    peer.on('call',call => {

        call.answer(stream)
        const video =document.createElement('video')
        call.on('stream',userVideoStream => {
            addVideoStream(video,userVideoStream)
        });

    });

    socket.on('user-connected',(userId)=> {
        connecTonewUser(userId,stream);


    });

     //For Sending Mesaage

let text = $('input')


$("html").keydown((e) => {
    if (e.which == 13 && text.val().length !==0) {
        socket.emit("message",text.val());
        text.val('')
    }
});


//messages comes from server 
socket.on('createMessage',message => {
    
    //now show the message to Chatbox
      $('.messages').append(`<li class="message"><b>user</b><br/>${message}</li>`)
    //   func to scroll chat
      scrollToBottom();
});
});

// listen the connection 

peer.on('open',id => {
    // After joining the room 
    socket.emit('join-room',room_id,id)
});

//room_id = address of user whom which you want connect
//id= specfic id of person whoese connecting to that address.


// catch the braodcasted the channel


//Call the player
const connecTonewUser = (userId,stream) => {
    //  USe Peer to connect the user
           const call = peer.call(userId,stream)
           const video = document.createElement('video')
           call.on("stream",userVideoStream => {
               addVideoStream(video,userVideoStream)

           });
      
}



//player 2 videoStream
const addVideoStream = (video,stream) => {
    // pLay the stream
      video.srcObject = stream;
      video.addEventListener('loadedmetadata' ,() => {
          video.play()
      })
      videoGrid.append(video);

}

const scrollToBottom = () => {
    let d = $('.main_chat_window');
    d.scrollTop(d.prop("scrollHeight"));
}

// Mute and UnMute the Voice;

const muteUnmute = () => {
    const enabled = myVideoStream.getAudioTracks()[0].enabled;
    if (enabled) {
        myVideoStream.getAudioTracks()[0].enabled = false;
        setUnmuteButton();

    } else {
        setMuteButton();
        myVideoStream.getAudioTracks()[0].enabled= true;
    }
}



const setMuteButton = () => {
    const html = `
       <i class="fas fa-microphone"></i>
       <span>Mute</span>
       `
       document.querySelector('.main_mute_button').innerHTML = html;

       

}


const setUnmuteButton = () => {
    const html = `
       <i class="unmute fas fa-microphone-slash"></i>
       <span>Unmute</span>
       `
       document.querySelector('.main_mute_button').innerHTML = html;

    
}

// Mute and UnMute the Video; 

const playStop = () => {
     
     let enabled = myVideoStream.getVideoTracks()[0].enabled;
     if (enabled) {
        myVideoStream.getVideoTracks()[0].enabled=false;
        setPlayVideo();
     } else {
         setStopVideo()
        myVideoStream.getVideoTracks()[0].enabled=true;
     }
}



const setStopVideo = () => {

    const html =`
    <i class="fas fa-video"></i>
    <span>Stop Video</span>
    `
    document.querySelector('.main_video_button').innerHTML=html;

}


const setPlayVideo = () => {

    const html =`
    <i class="stop fas fa-video-slash"></i>
    <span>Play Video</span>
    `
    document.querySelector('.main_video_button').innerHTML=html;

}








