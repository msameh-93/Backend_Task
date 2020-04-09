//Has access to socket.io library as its included in front-end page
const socket= io();           //Connect to web socket server

socket.on("message", (message) => {
    console.log(">> " + message);
});

document.querySelector("#msg-form").addEventListener("submit", (e) => {
    e.preventDefault();     //prevents page refreshing

    const msg= e.target.elements.msg;       //Grab value of msg input 
    socket.emit("chat", msg);
})