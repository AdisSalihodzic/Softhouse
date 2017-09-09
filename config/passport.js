/**
 * Created by rejhan on 9.9.2017.
 */

var LocalStrategy = require("passport-local").Strategy;
var User = require("../models/user");
var FacebookStrategy = require('passport-facebook').Strategy;
var configAuth       = require('./oauth');

module.exports = function (passport) {
    passport.serializeUser(function(user,done){
        done(null,user);
    });
    passport.deserializeUser(function(user,done){
        done(null,user);
    });

    passport.use('local-login', new LocalStrategy(
        function(username, password, done) {
            User.findOne({
                username: username.toLowerCase()
            }, function(err, user) {
                // if there are any errors, return the error before anything else
                if (err)
                    return done(err);

                // if no user is found, return the message
                if (!user)
                    return done(null, false);

                // if the user is found but the password is wrong
                if (!user.validPassword(password))
                    return done(null, false);

                // all is well, return successful user
                return done(null, user);
            });
        }
    ));

    // Facebook strategy
    passport.use(new FacebookStrategy({
            // pull in our app id and secret from our auth.js file
            clientID        : configAuth.facebookAuth.clientID,
            clientSecret    : configAuth.facebookAuth.clientSecret,
            callbackURL     : configAuth.facebookAuth.callbackURL,
            profileFields   : ['displayName','profileUrl','email','friends','photos',"feed","gender","birthday"]
        },

// facebook will send back the token and profile
        function(token, refreshToken, profile, done) {
            // asynchronous
            process.nextTick(function() {
                // find the user in the database based on their facebook id
                User.findOne({ 'facebook.id' : profile.id }, function(err, user) {

                    // if there is an error, stop everything and return that
                    // ie an error connecting to the database
                    if (err)
                        return done(err);

                    // if the user is found, then log them in
                    if (user) {
                        return done(null, user); // user found, return that user
                    } else {
                        // if there is no user found with that facebook id, create them
                        var newUser            = new User();
                        // set all of the facebook information in our user model
                        newUser.facebook.id    = profile.id; // set the users facebook id
                        newUser.facebook.token = token; // we will save the token that facebook provides to the user
                        newUser.facebook.email  = profile._json.email;
                        newUser.facebook.gender  = profile._json.gender;
                        newUser.facebook.birthday  = profile._json.birthday;
                        newUser.facebook.name  = profile.displayName;
                        newUser.facebook.friends = profile._json.friends.data;
                        newUser.facebook.photos = profile.photos
                        newUser.facebook.profileUrl = profile.profileUrl;
                        newUser.facebook.feed = profile._json.feed.data;

                        // save our user to the database
                        newUser.save(function(err) {
                            if (err)
                                throw err;

                            // if successful, return the new user
                            return done(null, newUser);
                        });
                    }

                });
            });

        }));
};