var express = require("express");
var app = express();
app.get("/",function(req,res){
    res.send("Starting point for server side");
});
app.listen(3000);