const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20");

passport.use(
    new GoogleStrategy({
    
    //options for the strategy
    clientID: "CLIENT_ID",
    clientSecret: "CLIENT_SECRET"

    }),() => {
        //passport callback function
    }
)
