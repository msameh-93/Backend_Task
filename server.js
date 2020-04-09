const app= require(`${__dirname}\\app`);
const http= require("http");
const socketio= require("socket.io");
/***********************************************/
const server= http.createServer(app);   //Created explicitly to use server for websocket io
const io= socketio(server);     //Serves a client side file that can be used
//Socket.io send/receive events between client and server

io.on("connection", (socket) => {   //socket argument refers current connecting client
    const message= "Welcome to websocket challenge";
    socket.emit("message", message);
    socket.on("chat", (msg) => {
        io.emit("message", msg);
    });
})
//Listen to local host
server.listen(8000, () => {
    console.log("Connection to server is Successful");
});