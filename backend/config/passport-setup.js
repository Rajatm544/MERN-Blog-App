const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth2").Strategy;
const keys = require("./keys");
const User = require("../models/user.model");

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    User.findById(id).then(user => done(null, user));
});

passport.use(
    new GoogleStrategy(
        {
            //options for the strategy
            callbackURL: "/auth/google/callback",
            clientID: keys.CLIENT_ID,
            clientSecret: keys.CLIENT_SECRET
        },
        (accessToken, refreshToken, profile, done) => {
            //passport callback function

            //check if user exists in our database
            User.findOne({ googleId: profile.id }).then(foundUser => {
                if (foundUser) {
                    // console.log("Found a user:" + foundUser);
                    done(null, foundUser);
                } else {
                    const newUser = {
                        username: profile.displayName,
                        googleId: profile.id
                    };
                    new User(newUser).save().then(newUser => {
                        console.log("New User: " + newUser);
                        done(null, newUser);
                    });
                }
            });
        }
    )
);
