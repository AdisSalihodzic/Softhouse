/**
 * Created by rejhan on 9.9.2017.
 */
var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/passport-db");

mongoose.set("debug", true);

module.exports.User = require("./user");