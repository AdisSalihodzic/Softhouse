/**
 * Created by rejhan on 9.9.2017.
 */
var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/softhouse-db");

module.exports.User = require("./user");