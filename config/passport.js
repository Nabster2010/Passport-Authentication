const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const GoogleStrategy = require('passport-google-oauth20').Strategy;

const User = require('../models/user.model');
const bcrypt = require('bcrypt');

//passport serializers
passport.serializeUser((user, done) => done(null, user.id));
passport.deserializeUser(async (id, done) => {
	try {
		const user = await User.findByPk(id);
		done(null, user);
	} catch (err) {
		done(err, false);
	}
});

//passport local strategy

passport.use(
	new LocalStrategy(
		{
			usernameField: 'email',
			passwordField: 'password',
		},
		async function (username, password, done) {
			try {
				const user = await User.findOne({ where: { email: username } });
				if (!user) return done(null, false, { message: 'Incorrect username.' });
				if (!bcrypt.compareSync(password, user.password)) {
					return done(null, false, { message: 'Incorrect password.' });
				} else {
					return done(null, user);
				}
			} catch (err) {
				return done(err, false);
			}
		}
	)
);

// Google Oauth20

passport.use(
	new GoogleStrategy(
		{
			clientID: process.env.GOOGLE_CLIENT_ID,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET,
			callbackURL: 'http://localhost:3000/auth/google/callback',
		},
		async function (accessToken, refreshToken, profile, cb) {
			try {
				const user = await User.findOne({ where: { googleId: profile.id } });
				if (!user) {
					const newUser = await User.create({
						email: profile.emails[0].value,
						googleId: profile.id,
						displayName: profile.displayName,
					});
					return cb(null, newUser);
				}
				return cb(null, user);
			} catch (err) {
				return cb(err, null);
			}
		}
	)
);
