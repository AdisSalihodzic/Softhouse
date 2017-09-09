/**
 * Created by rejhan on 9.9.2017.
 */
module.exports = {
    facebookAuth: {
        clientID: process.env.FB_CLIENT_ID,
        clientSecret: process.env.FB_SECRET,
        callbackURL: process.env.FB_CALLBACK_URL,
        enableProof: false
    }
};