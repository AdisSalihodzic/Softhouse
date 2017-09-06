var express = require("express");
var app = express();

app.use(express.static(__dirname+"/public"));
app.use('/bower_components',  express.static(__dirname + '/bower_components'));
app.use('/data',  express.static(__dirname + '/data'));

app.get("/",function(req,res){
    res.send("Starting point for server side");
});
app.get("/home",function(req,res,next){
    res.sendFile("index.html",{
        root: __dirname+"/public"
    });
});
app.listen(3000);