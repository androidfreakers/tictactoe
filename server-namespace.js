var expressio = require("express.io");
var fs = require("fs");
var app = expressio();
app.http().io();

var userMap = {};
app.get("/", function(req, res){
    res.sendfile("namespace-client.html");
});

app.io.on("connection", function(socket){

});

var userList = new Array();
var nsp = app.io.of('/my-namespace');
nsp.on('connection', function(socket){
  socket.on("myName", function(name){
    socket.name = name;
    userList[name] = socket.id;
    nsp.emit("newUser", name);
  });

  socket.on("disconnect", function(){
    delete userList[socket.name];
  });

  socket.on("message", function(msgObj){
    nsp.sockets[userList[msgObj["name"]]].emit("message", {"name":socket.name, "message":msgObj["message"]});
  })
});



app.listen(8081, function(){
    console.log("listening on 8081");
});
