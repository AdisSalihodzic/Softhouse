var express = require("express");
var passport = require("passport");
var coockieParser = require("cookie-parser");
var session = require("express-session");
var dotenv = require('dotenv');

var app = express();
dotenv.load();

app.use(express.static(__dirname+"/public"));
app.use('/bower_components',  express.static(__dirname + '/bower_components'));
app.use('/data',  express.static(__dirname + '/data'));

require("./config/passport")(passport); // passing passport for configuration

app.use(session({
    secret : "this is a secret"
}));

app.use(coockieParser());
app.use(passport.initialize());
app.use(passport.session());

// BODY PARSER
var bodyParser = require("body-parser");
app.use(bodyParser.json()); // parsing content

app.use(bodyParser.urlencoded({
    extended :true
}));

// ROUTES
require("./routes/auth.js")(app,passport);
require("./routes/main.js")(app);

app.listen(3000,function () {
    console.log("Server has been started");
});