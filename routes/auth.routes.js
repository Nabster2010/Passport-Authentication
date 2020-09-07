const router = require('express').Router();
const passport = require('passport');
const userController = require('../controllers/user.controller');
const ensureGuest = require('../middlewares/ensureGuest');
const ensureAuthenticated = require('../middlewares/ensureAuthenticated');

router.get('/login', ensureGuest, (req, res) =>
	res.render('login', { message: req.flash('error'), title: 'login Page' })
);

router.get('/register', (req, res) =>
	res.render('register', { title: 'Register Page' })
);
router.post('/register', userController.createUser);
router.post(
	'/login',
	passport.authenticate('local', {
		failureRedirect: '/auth/login',
		failureFlash: true,
	}),
	(req, res) => {
		res.redirect('/profile');
	}
);

router.get(
	'/google',
	passport.authenticate('google', { scope: ['profile', 'email'] })
);

router.get(
	'/google/callback',
	passport.authenticate('google', { failureRedirect: '/login' }),
	function (req, res) {
		// Successful authentication, redirect home.
		res.redirect('/profile');
	}
);

router.get('/logout', ensureAuthenticated, (req, res) => {
	req.logOut();

	res.redirect('/');
});
module.exports = router;
