const app= require(`${__dirname}\\app`);

//Listen to local host
app.listen(8000, () => {
    console.log("Connection to server is Successful");
});