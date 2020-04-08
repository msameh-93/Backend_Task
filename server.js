const app= require(`${__dirname}\\app`);
const http= require("http");
const socketio= require("socket.io");
/***********************************************/
const server= http.createServer(app);   //Created explicitly to use server for websocket io
const io= socketio(server);     //Serves a client side file that can be used
//Socket.io send/receive events between client and server

let count= 0;
io.on("connection", (socket) => {   //socket argument refers current connecting client
    console.log("User Connected");
    socket.on("buttonClicked", ()=> {
        console.log("received click event from client to server");
        console.log("Sending count variable from server to client");
        count++;
        socket.emit("countUpdated", count); //Emits to currently interacting client
        io.emit("countUpdated", count);     //Emits to all connected clients    (EG: two tabs)
    });
})
//Listen to local host
server.listen(8000, () => {
    console.log("Connection to server is Successful");
});