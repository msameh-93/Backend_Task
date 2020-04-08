//Has access to socket.io library as its included in front-end page
const socket= io();           //Connect to web socket server

socket.on("countUpdated", (count) => {
    console.log("Count update received in client side: "+count);
});

document.querySelector("#increment").addEventListener("click", () => {
    socket.emit("buttonClicked");
});