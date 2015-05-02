var expressio = require("express.io");
var fs = require("fs");
var app = expressio();
app.http().io();


app.get("/", function(req, res){
    res.sendfile("index.html");
});

app.io.on("connection", function(socket){
    console.log('a user connected');
    socket.on("hello", function(message){
        console.log(message)
    })
});
app.listen(8080, function(){
    console.log("listening on 8080");
});