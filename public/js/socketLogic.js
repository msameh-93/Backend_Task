//Has access to socket.io library as its included in front-end page
const socket= io();           //Connect to web socket server

socket.on("post", (message) => {
    //message is an object sent from Post controller
    console.log(">> " + message.name);
});

