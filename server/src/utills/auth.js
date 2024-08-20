import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { User } from "../models/User.js";

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.CLIENTID,
      clientSecret: process.env.CLIENTSECRET,
      callbackURL: "http://localhost:3000/google/callback",
      passReqToCallback: true, 
    },
    async (req, accessToken, refreshToken, profile, done) => {
      try {
        const email = profile.emails[0].value;
        const name = profile.displayName;
        const image = profile.photos[0].value;

        let existingUser = await User.findOne({ email });

        if (existingUser) {
          return done(null, existingUser);
        }

        const newUser = new User({
          name,
          email,
          image,
        });

        await newUser.save();
        done(null, newUser);
      } catch (error) {
        console.error("Error during authentication:", error);
        done(error, null);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user._id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (error) {
    done(error, null);
  }
});
