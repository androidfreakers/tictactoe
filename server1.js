var expressio = require("express.io");
var fs = require("fs");
var app = expressio();
app.http().io();


app.get("/", function(req, res){
    res.sendfile("test");
});

app.listen(8080);