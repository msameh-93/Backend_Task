//Has access to socket.io library as its included in front-end page
const socket= io();           //Connect to web socket server

socket.on("welcome", (message) => {
    console.log("message received from server side is: "+message);
});
