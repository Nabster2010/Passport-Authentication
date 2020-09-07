require('dotenv').config();
const express = require('express');
const passport = require('passport');
const flash = require('connect-flash');
const expressSession = require('express-session');
const db = require('./config/db');
const app = express();

//passport configuration

require('./config/passport');

app.set('view engine', 'ejs');
app.use(
	expressSession({
		secret: 'my secret',
		resave: false,
		saveUninitialized: false,
	})
);
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//routes

app.use('/auth', require('./routes/auth.routes'));
app.use('/users', require('./routes/user.routes'));
app.use('/profile', require('./routes/profile.routes'));

app.get('/', (req, res) => res.render('index', { title: 'HomePage' }));

const port = process.env.port || 3000;
app.listen(port, console.log(`server running on port ${port}`));

db.sync()
	.then(() => console.log('database is connected'))
	.catch((err) => console.log(err));
