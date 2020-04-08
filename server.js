const app= require(`${__dirname}\\app`);
const http= require("http");

//Listen to local host
const server= http.createServer(app);
server.listen(8000, () => {
    console.log("Connection to server is Successful");
});