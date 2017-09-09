/**
 * Created by rejhan on 9.9.2017.
 */
var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');

// define the schema for our user model
var userSchema = mongoose.Schema({
    username: String,
    password: String,
    email: String,
    firstName: String,
    lastName: String,
    facebook: {
        id: String,
        token: String,
        name: String,
        profileUrl:String,
        gender:String,
        email:String,
        birthday:String,
        friends:[],
        photos:[],
        feed:[]
    }

});
// methods
// generating  hash
userSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
};

// create the model for users and expose it to our app
module.exports = mongoose.model('User', userSchema);