var expressio = require("express.io");
var fs = require("fs");
var app = expressio();
app.http().io();

var userMap = {};
app.get("/", function(req, res){
    res.sendfile("index.html");
});

app.io.on("connection", function(socket){
    socket.emit("userList", userMap);

    socket.on("userName", function(userName){
      socket.userName = userName;
      userMap[userName] = socket;
      app.io.broadcast("newUser",userName)
    });

    socket.on("message", function(msgObj){
      var userName = msgObj["userName"];

      userMap[userName].emit("message", {
        "userName" : socket.userName,
        "message" : msgObj["message"]
      })

    })
});

app.listen(8081, function(){
    console.log("listening on 8081");
});
